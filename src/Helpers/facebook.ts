declare global {
	interface Window {
		fbAsyncInit: any;
		FB: any;
	}
}

export const initFacebookSdk = () => {
	return new Promise<void>((resolve, reject) => {
		// Set a timeout to reject the promise if not resolved within 10 seconds
		const timeout = setTimeout(() => {
			console.error('Facebook SDK initialization timeout');
			reject('Initialization timeout');
		}, 10000);

		window.fbAsyncInit = () => {
			window.FB.init({
				appId: '332595465974177',
				cookie: true,
				xfbml: true,
				version: 'v16.0',
			});
			clearTimeout(timeout); // Clear the timeout on successful initialization
			console.log('Facebook SDK initialized');
			resolve();
		};

		// Dynamically load the Facebook SDK script
		(function (d, s, id) {
			var js,
				fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = 'https://connect.facebook.net/en_US/sdk.js';
			fjs.parentNode.insertBefore(js, fjs);
		})(document, 'script', 'facebook-jssdk');
	});
};

export const getFacebookLoginStatus = () => {
	return new Promise((resolve) => {
		window.FB.getLoginStatus((response: any) => {
			const accessToken = response.authResponse.accessToken;
			console.log('Access token:', accessToken);

			resolve(response);
		});
	});
};

export const fbLogin = () => {
	return new Promise((resolve) => {
		window.FB.login((response: any) => {
			resolve(response);
		});
	});
};
