import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    alert: false,
    loading: false
};

const leaveSlice = createSlice({
    name: 'leave',
    initialState,
    reducers: {
        submit(state, action) {
            state.alert = false;
            state.loading = true;
        },
        submitSuccess(state, action) {
            state.alert = action.payload;
            state.loading = false;
        },
        submitFailed(state, action) {
            state.alert = action.payload;
            state.loading = false;
        }
    }
});

// Actions
export const leaveActions = leaveSlice.actions;

// Reducer
const leaveReducer = leaveSlice.reducer;
export default leaveReducer;
