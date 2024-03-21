import './EventsSlider.scss';
import EventCard from '../EventCard/EventCard';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { useEffect, useState } from 'react';
import { HOME_SLIDER_EVENT_QUERY } from '../../Queries/EventQueries';
import { SliderEventsForHomeQuery, SliderEventsForHomeQueryVariables } from '../../../generated/graphql/graphql';
import { useLazyQuery } from '@apollo/client';
import { EventDto } from '../../Types/EventTypes';

interface props {
	sortPopular: boolean;
	eventCount: number;
	searchTags: string[];
	searchText: string;
}

const EventsSlider = ({ sortPopular, eventCount, searchTags, searchText }: props) => {
	const [currentEvents, setCurrentEvents] = useState<EventDto[]>([]);
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState<number[]>([]);

	const [getEvents] = useLazyQuery<SliderEventsForHomeQuery, SliderEventsForHomeQueryVariables>(
		HOME_SLIDER_EVENT_QUERY,
		{
			onCompleted: (data) => {
				if (data?.events?.items != null) {
					setCurrentEvents(data.events.items);
				} else {
					console.log('null was returned, data: ');
					console.log(data);
				}
			},
		}
	);

	function changePage(pageNumber: number) {
		if (pageNumber > 0 && pageNumber <= pages.length && pageNumber != page) setPage(pageNumber);
	}

	useEffect(() => {
		var dots = Math.ceil((eventCount - 3) / 3);
		var arr: number[] = [];
		for (var i = 0; i < dots; i++) {
			arr.push(i);
		}
		setPages(arr);
	}, [eventCount]);

	useEffect(() => {
		getEvents({
			variables: {
				sorting: sortPopular ? 'popular' : 'soon',
				tags: searchTags,
				searchText: searchText,
				take: 3,
				skip: page * 3,
			},
		});
	}, [page, sortPopular, searchTags]);

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
				{pages.map((key) => (
					<div id='dotBox' key={key}>
						<span id='dot' className={page == key + 1 ? 'onPageDot' : ''} /*onClick={() => changePage(key + 1)}*/ />
					</div>
				))}
			</div>
		</div>
	);
};

export default EventsSlider;
