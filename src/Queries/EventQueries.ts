import { gql } from '../../generated/graphql';

export const HOME_BIG_EVENT_QUERY = gql(`
	query BigEventsForHome($sorting: String, $tags: [String!], $searchText: String) {
		events(sorting: $sorting, tags: $tags, searchText: $searchText, take: 3) {
			items {
				id
				title
				description
				image
			}
			totalCount
		}
	}
`);

export const HOME_SLIDER_EVENT_QUERY = gql(`
	query SliderEventsForHome($sorting: String, $tags: [String!], $searchText: String, $take: Int, $skip: Int) {
		events(sorting: $sorting, tags: $tags, searchText: $searchText, take: $take, skip: $skip) {
			items {
				id
				title
				description
				mediumImage
			}
		}
	}
`);

export const CALENDAR_EVENTS = gql(`
	query CalendarEvents($startTime: DateTime!, $endTime: DateTime!) {
		events(where: {and: [{startTime: {gte: $startTime}}, {startTime: {lte: $endTime}}]} order: {startTime: ASC} take: 20) {
			items {
				id
				title
				description
				startTime
				endTime
				smallImage
			}
		}
	}
`);
