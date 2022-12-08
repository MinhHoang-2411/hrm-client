import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    alert: false,
    loading: false,
    reloadList: false,
    listData: [],
    pagination: undefined
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
        },
        cancelAlert(state, action) {
            state.alert = null;
        },
        fetchData(state, action) {
            state.loading = true;
            state.pagination = {
                size: action.payload.size,
                page: action.payload.page
            };
        },
        fetchDataSuccess(state, action) {
            state.loading = false;
            state.listData = action.payload.content;
            state.pagination = {
                ...state.pagination,
                totalCount: action?.payload?.totalElements
            };
        },
        fetchDataFalse(state, action) {
            state.loading = false;
            console.error(action.payload);
        }
    }
});

// Actions
export const leaveActions = leaveSlice.actions;

// Reducer
const leaveReducer = leaveSlice.reducer;
export default leaveReducer;
