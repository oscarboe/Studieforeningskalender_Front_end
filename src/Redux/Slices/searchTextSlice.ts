import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const searchTextSlice = createSlice({
	name: 'tags',
	initialState: '',
	reducers: {
		setSearchText: (_, action: PayloadAction<string>) => {
			return action.payload;
		},
	},
});

export const { setSearchText } = searchTextSlice.actions;

export default searchTextSlice.reducer;
