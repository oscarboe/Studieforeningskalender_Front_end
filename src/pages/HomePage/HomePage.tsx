import './HomePage.scss';
import SideBar from '../../components/SideBar/SideBar';
import EventsSlider from '../../components/EventsSlider/EventsSlider';
import PopularEventsWrapper from '../../components/PopularEvents/PopularEventsWrapper';
import { useState } from 'react';

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
