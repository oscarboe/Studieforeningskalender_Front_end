import './HomePage.scss';
import SideBar from '../../components/SideBar/SideBar';
import EventsSlider from '../../components/EventsSlider/EventsSlider';
import PopularEventsWrapper from '../../components/PopularEvents/PopularEventsWrapper';
import { useState } from 'react';

export default function HomePage({ sortPopular }: { sortPopular: boolean }) {
	const [eventCount, setEventCount] = useState(0);
	const [searchTags, setSearchTags] = useState<string[]>([]);
	const [searchText, setSearchText] = useState('');

	return (
		<div className='home-page'>
			<SideBar setTags={setSearchTags} setText={setSearchText} />
			<div id='HomePageMainContent'>
				<PopularEventsWrapper
					searchTags={searchTags}
					searchText={searchText}
					sortPopular={sortPopular}
					setEventCount={setEventCount}
				/>
				<EventsSlider
					searchTags={searchTags}
					searchText={searchText}
					sortPopular={sortPopular}
					eventCount={eventCount}
				/>
			</div>
		</div>
	);
}
