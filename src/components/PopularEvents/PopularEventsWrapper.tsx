import React, { useEffect } from 'react';
import PopularEvent from './PopularEvent';
import './PopularEventsWrapper.css';
import { useLazyQuery } from '@apollo/client';
import { HOME_BIG_EVENT_QUERY } from '../../Queries/EventQueries';
import { BigEventsForHomeQuery, BigEventsForHomeQueryVariables } from '../../../generated/graphql/graphql';
import { RootState } from '../../Redux/store';
import { useSelector } from 'react-redux';

interface props {
	setEventCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function PopularEventsWrapper({ setEventCount }: props) {
	const tags = useSelector((state: RootState) => state.tags);
	const update = useSelector((state: RootState) => state.update);
	const searchText = useSelector((state: RootState) => state.searchText);
	const sortPopular = useSelector((state: RootState) => state.sortPopular);

	const [getEvents, { data }] = useLazyQuery<BigEventsForHomeQuery, BigEventsForHomeQueryVariables>(
		HOME_BIG_EVENT_QUERY,
		{
			onCompleted: (data) => {
				if (data?.events?.totalCount != null) {
					setEventCount(data.events.totalCount);
				}
			},
		}
	);

	useEffect(() => {
		getEvents({
			variables: {
				sorting: sortPopular ? 'popular' : 'soon',
				tags: tags.map((x) => x.name),
				searchText: searchText,
			},
		});
	}, [update, sortPopular]);

	return (
		<div className='popular-events-wrapper'>
			{data?.events?.items?.map((event, key) => (
				<PopularEvent eventData={event} swap={key % 2 == 0} key={key} />
			))}
		</div>
	);
}
