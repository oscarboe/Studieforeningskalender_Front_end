import './HomePage.scss';
import SideBar from '../../components/SideBar/SideBar';
import EventsSlider from '../../components/EventsSlider/EventsSlider';
import PopularEventsWrapper from '../../components/PopularEvents/PopularEventsWrapper';
import { useState } from 'react';
import { EventTag, EventUser } from '../../../generated/graphql/graphql';

export interface Event {
	creation?: Date;
	description?: string;
	endTime?: Date;
	eventTags?: Array<EventTag>;
	eventUsers?: Array<EventUser>;
	id?: string;
	image?: string;
	mediumImage?: string;
	smallImage?: string;
	startTime?: Date;
	title?: string;
	addressLine?: string;
	city?: string;
	postalCode?: string;
}

export default function HomePage() {
	const [eventCount, setEventCount] = useState(0);

	return (
		<div className='home-page'>
			<SideBar />
			<div id='HomePageMainContent'>
				<PopularEventsWrapper setEventCount={setEventCount} />
				<EventsSlider eventCount={eventCount} />
			</div>
		</div>
	);
}
