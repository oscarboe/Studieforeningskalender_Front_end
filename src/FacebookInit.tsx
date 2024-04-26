import { useEffect } from 'react';

export default function FBInit() {
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

	const handleLogin = () => {
		window.FB.login(
			function (response) {
				console.log(response);
				if (response.status === 'connected') {
					console.log('Welcome!  Fetching your information.... ');
					console.log(response.authResponse);
					FB.api(
						'/me?fields=events',
						{
							access_token: response.authResponse.code,
						},
						function (response2) {
							console.log(response2);
						}
					);
				}
			},
			{
				config_id: '760297902547164',
				response_type: 'code',
				override_default_response_type: true,
			}
		);
	};
	return <button onClick={handleLogin}>Login with Facebook</button>;
}
