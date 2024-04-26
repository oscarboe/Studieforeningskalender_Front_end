import { useLocation } from 'react-router-dom';
import { Event } from '../HomePage/HomePage';
import './EventPage.scss';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GetBigEventImageQuery, GetBigEventImageQueryVariables } from '../../../generated/graphql/graphql';
import { GET_BIG_EVENT_IMAGE } from '../../Queries/EventQueries';

const EventPage = () => {
	const state = useLocation().state as Event;

	const [getImage, { data }] = useLazyQuery<GetBigEventImageQuery, GetBigEventImageQueryVariables>(GET_BIG_EVENT_IMAGE);

	useEffect(() => {
		if (state.smallImage && state.id) getImage({ variables: { EventId: state.id } });
	}, []);

	return (
		<div className='event-page'>
			<h1>{state.title}</h1>
			<img src={`data:image/png;base64,${state.image}`} alt='Event image' />
		</div>
	);
};

export default EventPage;
