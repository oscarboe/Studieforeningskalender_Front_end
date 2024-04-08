import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './Slices/alertsSlice';
import tagsSlice from './Slices/tagsSlice';
import updateSlice from './Slices/updateSlice';
import searchTextSlice from './Slices/searchTextSlice';
import sortPopularSlice from './Slices/sortPopularSlice';
import loggedInSlice from './Slices/loggedInSlice';

const store = configureStore({
	reducer: {
		alerts: alertReducer,
		tags: tagsSlice,
		update: updateSlice,
		searchText: searchTextSlice,
		sortPopular: sortPopularSlice,
		loggedIn: loggedInSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
