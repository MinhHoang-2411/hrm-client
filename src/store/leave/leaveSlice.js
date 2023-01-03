import { FlareSharp } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    alert: false,
    loading: false,
    loadingWaiting: false,
    reloadList: false,
    listData: [],
    reloadListWaiting: false,
    listHoliday: [],
    loadingHolidays: false,
    loadingEdit: false,
    loadingCancel: false,
    loadingConfirm: false,
    loadingReject: false,
    listDataWaiting: [],
    pagination: undefined,
    paginationWaiting: undefined
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
        // LEAVE WAITING
        getListWaiting(state, action) {
            state.loadingWaiting = true;
            state.paginationWaiting = {
                size: action.payload.size,
                page: action.payload.page
            };
        },
        getListWaitingSuccess(state, action) {
            state.loadingWaiting = false;
            state.listDataWaiting = action.payload.content;
            state.paginationWaiting = {
                ...state.pagination,
                totalCount: action?.payload?.totalElements
            };
        },
        getListWaitingFalse(state, action) {
            state.loadingWaiting = false;
            console.error(action.payload);
        },

        // CANCEL
        cancelLeave(state, action) {
            state.loadingCancel = true;
        },
        cancelLeaveSuccess(state, action) {
            state.loadingCancel = false;
            state.reloadList = !state.reloadList;
        },
        cancelLeaveFail(state, action) {
            state.loadingCancel = false;
        },

        // REJECT
        rejectLeave(state, action) {
            state.loadingReject = true;
        },
        rejectLeaveSuccess(state, action) {
            state.loadingReject = false;
            state.reloadList = !state.reloadList;
        },
        rejectLeaveFail(state, action) {
            state.loadingReject = false;
        },

        // CONFIRM
        confirmLeave(state, action) {
            state.loadingConfirm = true;
        },
        confirmLeaveSuccess(state, action) {
            state.loadingConfirm = false;
            state.reloadList = !state.reloadList;
        },
        confirmLeaveFail(state, action) {
            state.loadingConfirm = false;
        }
    }
});

// Actions
export const leaveActions = leaveSlice.actions;

// Reducer
const leaveReducer = leaveSlice.reducer;
export default leaveReducer;
