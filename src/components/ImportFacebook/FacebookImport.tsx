import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../Redux/Slices/alertsSlice';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import './FacebookImport.scss';

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

interface FacebookImportProps {
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
const FacebookImport = ({ onEventsFetched }: FacebookImportProps) => {
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

	const handlePageSelect = (id: any) => {
		window.FB.api(`/${id}/events`, 'GET', (response: eventResponse) => {
			if (response.data.length === 0) {
				dispatch(
					addAlert({
						message: 'No events found. Check your page has created events.',
						severity: 'error',
					})
				);
				setPageInfo([]);
			} else if (response.data.length === 1) {
				onEventsFetched(response.data[0]);
				setPageInfo([]);
			} else if (response.data.length > 1) {
				setMultipleEvents(true);
				setEvents(response.data);
				setPageInfo([]);
			}
		});
	};

	const handleLogin = () => {
		window.FB.login(
			function (response: loginResponse) {
				if (response.status === 'connected') {
					window.FB.api('/me/accounts', 'GET', function (response: any) {
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
		<div className='FB'>
			{pageInfo.length > 1 ? (
				<div className='event-field'>
					<label>Vælg hvilken facebookside du vil importere fra.</label>
					<Autocomplete
						options={pageInfo}
						getOptionLabel={(option) => option.name}
						onChange={(_, newValue) => {
							handlePageSelect(newValue?.id);
						}}
						renderInput={(params) => <TextField {...params} label='Facebook side' variant='standard' />}
					/>
				</div>
			) : multipleEvents ? (
				<div className='event-field'>
					<label>Vælg hvilket event der skal importeres.</label>
					<Autocomplete
						className='event-field'
						options={events}
						getOptionLabel={(option) => option.name}
						onChange={(_, newValue) => {
							if (newValue) onEventsFetched(newValue);
							setMultipleEvents(false);
						}}
						renderInput={(params) => <TextField {...params} label='Event' variant='outlined' />}
					/>
				</div>
			) : (
				<button className='FBbtn' onClick={handleLogin}>
					Importer fra Facebook
				</button>
			)}
		</div>
	);
};
export default FacebookImport;
