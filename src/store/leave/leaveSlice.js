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
    listDataManagement: [],
    pagination: undefined,
    paginationWaiting: undefined,
    paginationManager: undefined,
    loadMore: false,
    loadMoreWaiting: false
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

        // LIST LEAVE FOR MANAGER
        fetchDataForManager(state, action) {
            state.loading = true;
            state.paginationManager = {
                size: action.payload.size,
                page: action.payload.page
            };
        },
        fetchDataForManagerSuccess(state, action) {
            state.loading = false;
            state.listDataManagement = action.payload.content;
            state.paginationManager = {
                ...state.paginationManager,
                totalCount: action?.payload?.totalElements
            };
        },
        fetchDataForManagerFail(state, action) {
            state.loading = false;
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
        },

        // LOAD MORE WAITING
        loadMoreWaiting(state, action) {
            state.loadMoreWaiting = true;
        },
        loadMoreWaitingSuccess(state, action) {
            state.listDataWaiting = [...state.listDataWaiting, ...action.payload.content];
            state.loadMoreWaiting = false;
        },
        loadMoreWaitingFail(state, action) {
            state.loadMoreWaiting = false;
            console.error(action.payload);
        },

        // LOAD MORE
        loadMore(state, action) {
            state.loadMore = true;
        },
        loadMoreSuccess(state, action) {
            state.listDataManagement = [...state.listDataManagement, ...action.payload.content];
            state.loadMore = false;
        },
        loadMoreFail(state, action) {
            state.loadMore = false;
            console.error(action.payload);
        }
    }
});

// Actions
export const leaveActions = leaveSlice.actions;

// Reducer
const leaveReducer = leaveSlice.reducer;
export default leaveReducer;
