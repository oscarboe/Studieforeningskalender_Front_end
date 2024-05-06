import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../Redux/Slices/alertsSlice';

interface loginResponse {
	authResponse: {
		accessToken: string;
		code: string;
		data_access_expiration_time: number;
		expiresIn: number;
		graphDomain: string;
		signedRequest: string;
		userID: string;
	};
	status: string;
}

export interface FBEvent {
	description: string;
	id: string;
	name: string;
	place: { name: string };
	start_time: string;
}

interface eventResponse {
	data: FBEvent[];
}

interface FBInitProps {
	onEventsFetched: (response: FBEvent) => void;
}

declare global {
	interface Window {
		FB: any;
	}
}
interface PageInfo {
	name: string;
	id: string;
}
const FBInit = ({ onEventsFetched }: FBInitProps) => {
	const [multipleEvents, setMultipleEvents] = useState(false);
	const [pageInfo, setPageInfo] = useState<PageInfo[]>([]);
	const [events, setEvents] = useState<FBEvent[]>([]);
	const dispatch = useDispatch();
	useEffect(() => {
		const scriptSDK = document.createElement('script');
		scriptSDK.src = 'https://connect.facebook.net/en_US/sdk.js';
		scriptSDK.async = true;
		scriptSDK.defer = true;
		scriptSDK.crossOrigin = 'anonymous';
		document.body.appendChild(scriptSDK);

		// Create script for FB init
		const scriptInit = document.createElement('script');
		scriptInit.innerHTML = `
            window.fbAsyncInit = function() {
                FB.init({
                    appId: '332595465974177',
                    xfbml: true,
                    version: 'v19.0'
                });
            };
        `;
		document.body.appendChild(scriptInit);
	}, []);

	const handlePageSelect = (id) => {
		setMultiplePages(false);
		FB.api(`/${id}/events`, 'GET', (response: eventResponse) => {
			if (response.data.length === 0)
				dispatch(
					addAlert({
						message: 'No events found. Check your page has created events.',
						severity: 'error',
					})
				);
			else if (response.data.length === 1) {
				onEventsFetched(response.data[0]);
			} else if (response.data.length > 1) {
				setMultipleEvents(true);
				setEvents(response.data);
			}
		});
	};

	const handleLogin = () => {
		window.FB.login(
			function (response: loginResponse) {
				if (response.status === 'connected') {
					FB.api('/me/accounts', 'GET', function (response) {
						if (response.data.length === 0) {
							dispatch(
								addAlert({
									message: 'No pages found. Check you are at least editor for a facebook page',
									severity: 'error',
								})
							);
							return;
						} else if (response.data.length === 1) {
							handlePageSelect(response.data[0].id);
							return;
						} else {
							setMultiplePages(true);
							setPageInfo(response.data);
							return;
						}
					});
				}
			},
			{
				config_id: '760297902547164',
				response_type: 'code',
			}
		);
	};

	return (
		<div>
			{pageInfo.length > 1 ? (
				<div>
					<label>Choose which page to import from.</label>
					<select onChange={(e) => handlePageSelect(e.target.value)}>
						{pageInfo.map((item) => (
							<option key={item.id} value={item.id}>
								{item.name}
							</option>
						))}
					</select>
				</div>
			) : (
				<button onClick={handleLogin}>Import Event From Facebook Page</button>
			)}

			{multipleEvents ? (
				<div>
					<label>Select the event to import.</label>
					<select
						onChange={(e) => {
							const selectedEvent = events.find((event) => event.id === e.target.value);
							if (selectedEvent) onEventsFetched(selectedEvent);
						}}
					>
						{events.map((event) => (
							<option key={event.id} value={event.id}>
								{event.name}
							</option>
						))}
					</select>
				</div>
			) : null}
		</div>
	);
};
export default FBInit;
