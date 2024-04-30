import { useState } from 'react';
import './KalenderPage.css';
import { Event } from '../HomePage/HomePage';
import { useQuery } from '@apollo/client';
import { EventQuery, EventQueryVariables } from '../../../generated/graphql/graphql';
import { EVENT } from '../../Queries/EventQueries';
import { useNavigate } from 'react-router-dom';

export default function KalenderPage() {
	const [event, setEvent] = useState<Event>({});

	const {} = useQuery<EventQuery, EventQueryVariables>(EVENT, {
		onCompleted: (data) => {
			if (data?.event) setEvent(data.event);
		},
	});

	const navigate = useNavigate();
	const showEvent = () => {
		navigate('/Event', { state: { event: event, imageSize: 'small' } });
	};

	return (
		<div className='kalender-page'>
			<button onClick={showEvent}>Show Event</button>
		</div>
	);
}
