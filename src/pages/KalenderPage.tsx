import './KalenderPage.css';
import PopularEventsWrapper from '../components/PopularEvents/PopularEventsWrapper';

export default function KalenderPage() {
	// const [login, { loading, error }] = useMutation(LOGIN_QUERY, {
	// 	variables: { username: username, password: password },
	// 	onCompleted: (data: UserTokenPayload) => {
	// 		console.log(data.login);
	// 	},
	// });

	// if (loading) return 'Loading...';
	// if (error) {
	// 	console.log(error);
	// 	return <pre>{error.message}</pre>;
	// }

	return (
		<div className='kalender-page'>
			<h1>Hello from Kalender</h1>
			<PopularEventsWrapper />
		</div>
	);
}
