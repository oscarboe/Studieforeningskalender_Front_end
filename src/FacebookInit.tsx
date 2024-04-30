// import { useEffect } from 'react';
// import { getFacebookLoginStatus, initFacebookSdk } from '../src/Helpers/facebook.ts';

// export default function FBInit() {
// 	useEffect(() => {
// 		console.log('Started use effect');

// 		initFacebookSdk()
// 			.then(() => {
// 				console.log('Facebook SDK initialized');
// 				return getFacebookLoginStatus();
// 			})
// 			.then((response) => {
// 				if (response == null) {
// 					console.log('No login status for the person');
// 				} else {
// 					console.log('Login status:', response);
// 				}
// 			})
// 			.catch((error) => {
// 				console.error('Error during FB SDK initialization or getting login status:', error);
// 			});
// 	}, []);

// 	return <></>;
// }
