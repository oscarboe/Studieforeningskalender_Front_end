import './HomePage.scss';
import SideBar from '../SideBar/SideBar';
import EventsSlider from '../EventsSlider/EventsSlider';
import PopularEventsWrapper from '../../components/PopularEvents/PopularEventsWrapper';

export default function HomePage() {
	return (
		<div className='home-page'>
			<SideBar />
			<div id='HomePageMainContent'>
				<PopularEventsWrapper />
				<EventsSlider />
			</div>
		</div>
	);
}
