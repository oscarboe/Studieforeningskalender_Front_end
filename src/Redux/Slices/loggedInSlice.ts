import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const loggedInSlice = createSlice({
	name: 'alerts',
	initialState: false,
	reducers: {
		setLoggedIn: (_, action: PayloadAction<boolean>) => {
			return action.payload;
		},
	},
});

export const { setLoggedIn } = loggedInSlice.actions;

export default loggedInSlice.reducer;
