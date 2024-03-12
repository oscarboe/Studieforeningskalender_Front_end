import './HomePage.scss';
import SideBar from '../SideBar/SideBar';
import EventsSlider from '../EventsSlider/EventsSlider';
import Navbar from '../../components/Navbar';

export default function HomePage() {
  return (
    <div className="home-page">
      <SideBar />
      <div id="HomePageMainContent">
        <Navbar />
        <EventsSlider />
      </div>
    </div>
  );
}
