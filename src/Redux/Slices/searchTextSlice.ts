import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const searchTextSlice = createSlice({
	name: 'tags',
	initialState: '',
	reducers: {
		setSearchText: (state, action: PayloadAction<string>) => {
			return action.payload;
		},
	},
});

export const { setSearchText } = searchTextSlice.actions;

export default searchTextSlice.reducer;
