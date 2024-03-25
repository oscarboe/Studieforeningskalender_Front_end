import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface tag {
	id: string;
	name: string;
}

const initialState: tag[] = [];

const alertSlice = createSlice({
	name: 'tags',
	initialState,
	reducers: {
		addTag: (state, action: PayloadAction<tag>) => {
			state.push(action.payload);
		},
		removeTag: (state, action: PayloadAction<tag>) => {
			return state.filter((tag) => tag.id !== action.payload.id);
		},
	},
});

export const { addTag, removeTag } = alertSlice.actions;

export default alertSlice.reducer;
