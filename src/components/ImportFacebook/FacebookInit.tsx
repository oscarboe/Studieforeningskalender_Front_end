import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';

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
	const [multiplePages, setMultiplePages] = useState(false);
	const [multipleEvents, setMultipleEvents] = useState(false);
	const [pageInfo, setPageInfo] = useState<PageInfo[]>([]);
	const [events, setEvents] = useState<FBEvent[]>([]);
	useEffect(() => {
		// Create script for FB SDK
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
				console.log('FB SDK initialized');
            };
        `;
		document.body.appendChild(scriptInit);
	}, []);

	const handlePageSelect = (id) => {
		setMultiplePages(false);
		console.log(id);
		FB.api(`/${id}/events`, 'GET', (response: eventResponse) => {
			if (response.data.length === 1) {
				onEventsFetched(response.data[0]);
			} else if (response.data.length > 1) {
				setEvents([]);
				setMultipleEvents(true);
				setEvents(response.data);
			}
		});
	};

	const handleLogin = () => {
		window.FB.login(
			function (response: loginResponse) {
				console.log(response);
				if (response.status === 'connected') {
					console.log('Welcome!  Fetching your information.... ');
					console.log(response.authResponse);
					FB.api('/me/accounts', 'GET', function (response) {
						console.log('This is the accounts', response);
						if (response.data.length === 0) {
							console.log('No pages found');
							return;
						} else if (response.data.length === 1) {
							handlePageSelect(response.data[0].id);
							return;
						} else {
							setMultiplePages(true);
							setPageInfo([]);
							setPageInfo(response.data);
							console.log('Multiple pages found');
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
			{multiplePages ? (
				<div>
					<label>Vælg hvilken side der ønskes importeret events fra.</label>
					<select onChange={(e) => handlePageSelect(e.target.value)}>
						{pageInfo.map((item, index) => (
							<option key={index} value={item.id}>
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
						{events.map((event, index) => (
							<option key={index} value={event.id}>
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
