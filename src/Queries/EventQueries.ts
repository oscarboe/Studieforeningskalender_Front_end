import { gql } from '../../generated/graphql';

export const HOME_BIG_EVENT_QUERY = gql(`
	query BigEventsForHome($sorting: String, $tags: [String!], $searchText: String) {
		events(sorting: $sorting, tags: $tags, searchText: $searchText, take: 3) {
			items {
				id
				title
				description
				image
				startTime
				endTime
				addressLine
				city
				postalCode
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
				startTime
				endTime
				addressLine
				city
				postalCode
			}
		}
	}
`);

export const CALENDAR_EVENTS = gql(`
	query CalendarEvents($startTime: DateTime!, $endTime: DateTime!) {
		events(
			where: {
				or: [
				{
					and: [
					{ startTime: { gte: $startTime } }
					{ startTime: { lte: $endTime } }
					]
				}
				{
					and: [
					{ endTime: { gte: $startTime } }
					{ endTime: { lte: $endTime } }
					]
				}
				{
					and: [
					{ startTime: { lte: $startTime } }
					{ endTime: { gte: $endTime } }
					]
				}
				]
			}
			order: { startTime: ASC }
			take: 50
		) {
			items {
				id
				title
				description
				startTime
				endTime
				image: smallImage
				addressLine
				city
				postalCode
			}
		}
	}
`);

export const CALENDAR_EVENTS_BIG_IMAGE = gql(`
	query CalendarEventsBigImage($startTime: DateTime!, $endTime: DateTime!) {
		events(
			where: {
				or: [
				{
					and: [
					{ startTime: { gte: $startTime } }
					{ startTime: { lte: $endTime } }
					]
				}
				{
					and: [
					{ endTime: { gte: $startTime } }
					{ endTime: { lte: $endTime } }
					]
				}
				{
					and: [
					{ startTime: { lte: $startTime } }
					{ endTime: { gte: $endTime } }
					]
				}
				]
			}
			order: { startTime: ASC }
			take: 50
		) {
			items {
				id
				title
				description
				startTime
				endTime
				image
				addressLine
				city
				postalCode
			}
		}
	}
`);

export const CREATE_EVENT_QUERY = gql(`
	mutation CreateEvent($createEventInput: CreateEventInput!) {
		createEvent(input: $createEventInput) {
			isSuccessful
			message
		}
	}
`);

export const GET_MEDIUM_EVENT_IMAGE = gql(`
	query GetMediumEventImage($EventId: ID!){
		event(where: {id: {eq: $EventId}}) {
			mediumImage
		}
	}
`);

export const GET_BIG_EVENT_IMAGE = gql(`
	query GetBigEventImage($EventId: ID!){
		event(where: {id: {eq: $EventId}}) {
			image
		}
	}
`);

export const GET_DESCRIPTION_FROM_CHATGPT = gql(`
	query AskChatGPT($prompt: String!) {
		chatGPTDescription(prompt: $prompt) {
			isSuccessful
			response
			message
		}
	}
`);
