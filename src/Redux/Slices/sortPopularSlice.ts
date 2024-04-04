import { createSlice } from '@reduxjs/toolkit';

const sortPopularSlice = createSlice({
	name: 'tags',
	initialState: true,
	reducers: {
		changeSorting: (state) => {
			return !state;
		},
	},
});

export const { changeSorting } = sortPopularSlice.actions;

export default sortPopularSlice.reducer;
