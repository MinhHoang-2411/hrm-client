import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dataProfile: {},
    loading: false
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        fetchData(state, action) {
            state.loading = true;
        },
        fetchDataSuccess(state, action) {
            state.loading = false;
            state.dataProfile = action.payload;
        },
        fetchDataFalse(state, action) {
            state.loading = false;
        }
    }
});

// Actions
export const profileAction = profileSlice.actions;

// Reducer
const profileReducer = profileSlice.reducer;
export default profileReducer;
