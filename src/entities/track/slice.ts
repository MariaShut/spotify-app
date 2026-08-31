import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TrackState {
	token: string;
}

const initialState: TrackState = {
	token: '',
};

const trackSlice = createSlice({
	name: 'track',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		clearToken: state => {
			state.token = '';
		},
	},
});

export const { setToken, clearToken } = trackSlice.actions;
export default trackSlice.reducer;
