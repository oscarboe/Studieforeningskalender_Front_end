import { useLocation, useNavigate } from 'react-router-dom';
import { Event } from '../HomePage/HomePage';
import './EventPage.scss';
import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
	AddSelfMutation,
	AddSelfMutationVariables,
	GetBigEventImageQuery,
	GetBigEventImageQueryVariables,
} from '../../../generated/graphql/graphql';
import { GET_BIG_EVENT_IMAGE } from '../../Queries/EventQueries';
import { FaLocationDot } from 'react-icons/fa6';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { useDispatch } from 'react-redux';
import { setAlerts } from '../../Redux/Slices/alertsSlice';
import DateAndTimeBox from '../../components/DateAndTimeBox/DateAndTimeBox';
import { ADD_SELF_TO_EVENT } from '../../Queries/EventUserQueries';
import { HandleGraphQLError, HandleGraphQLSuccess } from '../../Helpers/ResponseHelper';
import 'add-to-calendar-button';

dayjs.extend(localeData);

const EventPage = () => {
	const { event, imageSize } = useLocation().state as { event: Event; imageSize: 'small' | 'medium' | 'large' };
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [getImage, { data }] = useLazyQuery<GetBigEventImageQuery, GetBigEventImageQueryVariables>(GET_BIG_EVENT_IMAGE);
	const [signUp] = useMutation<AddSelfMutation, AddSelfMutationVariables>(ADD_SELF_TO_EVENT, {
		onCompleted: (data) => HandleGraphQLSuccess(data.addSelfToEvent, dispatch, 'addUserToEvent'),
		onError: (error) => HandleGraphQLError(error, dispatch),
	});

	useEffect(() => {
		console.log(event);
		if (!event) {
			dispatch(setAlerts([{ message: 'No event to show', severity: 'error' }]));
			navigate('/');
		} else if (imageSize != 'large' && event.id) getImage({ variables: { EventId: event.id } });
	}, []);

	const joinEvent = () => {
		if (event.id) signUp({ variables: { addSelfInput: { eventId: event.id, isAdmin: false } } });
	};

	if (event)
		return (
			<div className='event-page'>
				<img src={`data:image/png;base64,${data?.event?.image || event.image}`} alt='Event image' />
				<div className='title-and-signup'>
					<h1>{event.title}</h1>
					<button onClick={joinEvent}>Sign Up</button>
				</div>
				<span className='divider'></span>
				<div className='content'>
					<p className='description'>{event.description}</p>
					<div className='side-content'>
						<DateAndTimeBox event={event} />
						<div className='location-box'>
							<p>Location</p>
							<div className='location'>
								<FaLocationDot className='logo' />
								<address>
									{event.addressLine}, {event.postalCode} {event.city}
								</address>
							</div>
						</div>
					</div>
				</div>
				<add-to-calendar-button
					name={event.title}
					description={event.description}
					location={`${event.addressLine}, ${event.postalCode} ${event.city}`}
					startDate={event.startTime?.toString()}
					endDate={event.endTime?.toString()}
					options="['Apple','Google','iCal','Microsoft365','Outlook.com','Yahoo']"
					identifier='add-to-calendar-button'
				/>
			</div>
		);
};

export default EventPage;
