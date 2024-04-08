export const initFacebookSdk = () => {
	console.log('Init Facebook SDK');
	return new Promise<void>((resolve) => {
		// Load the Facebook SDK asynchronously
		window.fbAsyncInit = () => {
			window.FB.init({
				appId: '332595465974177',
				cookie: true,
				xfbml: true,
				version: 'v16.0',
			});
			// Resolve the promise when the SDK is loaded
			resolve();
		};
	});
};

export const getFacebookLoginStatus = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return new Promise<any>((resolve) => {
		window.FB.getLoginStatus((response) => {
			resolve(response);
		});
	});
};

export const fbLogin = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return new Promise<any>((resolve) => {
		window.FB.login((response) => {
			resolve(response);
		});
	});
};
