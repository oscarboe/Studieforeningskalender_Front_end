import { createSlice } from '@reduxjs/toolkit';

const initialState: boolean = false;

const updateSlice = createSlice({
	name: 'updateSwitch',
	initialState,
	reducers: {
		toggleSwitch: (state) => {
			return !state;
		},
	},
});

export const { toggleSwitch } = updateSlice.actions;

export default updateSlice.reducer;
