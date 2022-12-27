import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    alert: false,
    loading: false,
    reloadList: false,
    listData: [],
    listHoliday: [],
    loadingHolidays: false,
    loadingEdit: false,
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
        },
        // HOLIDAYS
        getHolidays(state, action) {
            state.loadingHolidays = true;
        },
        getHolidaysSuccess(state, action) {
            state.loadingHolidays = false;
            state.listHoliday = action.payload.data;
        },
        getHolidayFail(state, action) {
            state.loadingHolidays = false;
        },

        // EDIT
        editLeave(state, action) {
            state.loadingEdit = true;
        },
        editLeaveSuccess(state, action) {
            state.loadingEdit = false;
            state.reloadList = !state.reloadList;
        },
        editLeaveFail(state, action) {
            state.loadingEdit = false;
        }
    }
});

// Actions
export const leaveActions = leaveSlice.actions;

// Reducer
const leaveReducer = leaveSlice.reducer;
export default leaveReducer;
