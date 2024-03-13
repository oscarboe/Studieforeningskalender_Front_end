import './EventsSlider.scss';
import { ExampleEvents, cardInfo } from '../../../public/ExampleData';
import EventCard from '../EventCard/EventCard';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { useEffect, useState } from 'react';

const EventsSlider = () => {
  const [events, setEvents] = useState<cardInfo[]>([]);
  const [currentEvents, setCurrentEvents] = useState<cardInfo[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState<number[]>([]);

  const fetchEvents = async (pageNumber: number) => {
    // const response = await fetch data
    // Set events data
    const fetchedEvents = ExampleEvents.slice(
      (pageNumber - 1) * 3,
      (pageNumber - 1) * 3 + 3
    );

    if (events.length <= pageNumber * 3)
      setEvents([...events, ...fetchedEvents]);

    setCurrentEvents(fetchedEvents);
  };

  function changePage(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= pages.length && pageNumber != page)
      setPage(pageNumber);
  }

  useEffect(() => {
    var dots = Math.ceil(ExampleEvents.length / 3);
    for (var i = 0; i < dots; i++) {
      setPages((pages) => [...pages, i]);
    }
  }, []);

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  return (
    <div id='eventsSlider'>
      <div id='slider'>
        <button id='backButton' onClick={() => changePage(page - 1)}>
          <SlArrowLeft />
        </button>
        <div id='currentEvents'>
          {currentEvents.map((event, key) => (
            <EventCard event={event} key={key} />
          ))}
        </div>
        <button id='nextButton' onClick={() => changePage(page + 1)}>
          <SlArrowRight />
        </button>
      </div>
      <div id='dots'>
        {pages.map((num, key) => (
          <div id='dotBox' key={key}>
            <span
              id='dot'
              className={page == key + 1 ? 'onPageDot' : ''}
              onClick={() => changePage(key + 1)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSlider;
