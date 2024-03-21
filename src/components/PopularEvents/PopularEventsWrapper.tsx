import React from 'react';
import PopularEvent from './PopularEvent';
import './PopularEventsWrapper.css';
import { useQuery } from '@apollo/client';
import { HOME_BIG_EVENT_QUERY } from '../../Queries/EventQueries';
import { BigEventsForHomeQuery, BigEventsForHomeQueryVariables } from '../../../generated/graphql/graphql';

interface props {
	sortPopular: boolean;
	searchTags: string[];
	searchText: string;
	setEventCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function PopularEventsWrapper({ sortPopular, searchTags, searchText, setEventCount }: props) {
	const { data } = useQuery<BigEventsForHomeQuery, BigEventsForHomeQueryVariables>(HOME_BIG_EVENT_QUERY, {
		variables: {
			sorting: sortPopular ? 'popular' : 'soon',
			tags: searchTags,
			searchText: searchText,
		},
		onCompleted: (data) => {
			if (data?.events?.totalCount != null) {
				setEventCount(data.events.totalCount);
			}
		},
	});

	return (
		<div className='popular-events-wrapper'>
			{data?.events?.items?.map((event, key) => (
				<PopularEvent eventData={event} swap={key % 2 == 0} key={key} />
			))}
		</div>
	);
}
