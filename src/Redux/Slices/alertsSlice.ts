import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface alert {
	field?: string;
	message: string;
	severity: 'error' | 'info' | 'warning' | 'success';
	component?: string;
}

const initialState: alert[] = [];

const alertSlice = createSlice({
	name: 'alerts',
	initialState,
	reducers: {
		setAlerts: (_, action: PayloadAction<alert[]>) => {
			return action.payload;
		},
		addAlert: (state, action: PayloadAction<alert>) => {
			state.push(action.payload);
		},
		removeAlert: (state, action: PayloadAction<alert>) => {
			return state.filter((alert) => alert.message !== action.payload.message);
		},
		emptyAlerts: (_) => {
			return [];
		},
	},
});

export const { setAlerts, addAlert, emptyAlerts, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
