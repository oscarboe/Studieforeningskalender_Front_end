import './KalenderPage.css';
import PopularEventsWrapper from '../components/PopularEvents/PopularEventsWrapper';
import { TEST_QUERY } from '../Queries/UserQueries';
import { useQuery } from '@apollo/client';

export default function KalenderPage() {
	const { loading, error } = useQuery(TEST_QUERY);

	if (loading) return 'Loading...';
	if (error) {
		console.log(error);
		return <pre>{error.message}</pre>;
	}

	return (
		<div className='kalender-page'>
			<h1>Hello from Kalender</h1>
			<PopularEventsWrapper />
		</div>
	);
}
