import { submitLeave, getAll, getAllHoliday } from 'api/leave';
import { all, call, fork, put, takeEvery, takeLatest, take, delay } from 'redux-saga/effects';
import { leaveActions } from './leaveSlice';

function* handleSubmit(action) {
    try {
        yield call(submitLeave, action.payload);
        yield put(leaveActions.submitSuccess('success'));
    } catch (error) {
        yield put(leaveActions.submitFailed('failed'));
    } finally {
        yield delay(2000);
        yield put(leaveActions.cancelAlert(null));
    }
}

function* handleFetchData(action) {
    try {
        const params = action.payload;
        const response = yield call(getAll, params);
        yield put(leaveActions.fetchDataSuccess(response.data));
    } catch (error) {
        yield put(leaveActions.fetchDataFalse('An error occurred, please try again'));
    }
}

function* handleGetAllHoliday(action) {
    try {
        const params = action.payload;
        const response = yield call(getAllHoliday, params);

        yield put(leaveActions.getHolidaysSuccess(response));
    } catch (error) {
        yield put(leaveActions.getHolidayFail('An error occurred, please try again'));
    }
}

function* watchFlow() {
    yield all([
        takeLatest(leaveActions.fetchData.type, handleFetchData),
        takeLatest(leaveActions.submit.type, handleSubmit),
        takeLatest(leaveActions.getHolidays.type, handleGetAllHoliday)
    ]);
}

export function* leaveSaga() {
    yield fork(watchFlow);
}
