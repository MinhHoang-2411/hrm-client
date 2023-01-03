import { submitLeave, getAll, getAllHoliday, cancelLeave, rejectLeave, confirmLeave } from 'api/leave';
import { all, call, fork, put, takeEvery, takeLatest, take, delay } from 'redux-saga/effects';
import { leaveActions } from './leaveSlice';
import { alertActions } from '../alert/alertSlice';

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

function* handleCancelLeave(action) {
    try {
        const params = action.payload;
        yield call(cancelLeave, params);

        yield put(leaveActions.cancelLeaveSuccess());
        yield put(
            alertActions.showAlert({
                text: 'Cancel Leave successfully',
                type: 'success'
            })
        );
    } catch (error) {
        yield put(leaveActions.cancelLeaveFail());
        yield put(
            alertActions.showAlert({
                text: 'An error occurred, please try again',
                type: 'error'
            })
        );
    }
}

function* handleRejectLeave(action) {
    try {
        const params = action.payload;
        yield call(rejectLeave, params);

        yield put(leaveActions.rejectLeaveSuccess());
        yield put(
            alertActions.showAlert({
                text: 'Reject Leave successfully',
                type: 'success'
            })
        );
    } catch (error) {
        yield put(leaveActions.rejectLeaveFail());
        yield put(
            alertActions.showAlert({
                text: 'An error occurred, please try again',
                type: 'error'
            })
        );
    }
}

function* handleConfirmLeave(action) {
    try {
        const params = action.payload;
        yield call(confirmLeave, params);

        yield put(leaveActions.confirmLeaveSuccess());
        yield put(
            alertActions.showAlert({
                text: 'Confirm Leave successfully',
                type: 'success'
            })
        );
    } catch (error) {
        yield put(leaveActions.confirmLeaveFail());
        yield put(
            alertActions.showAlert({
                text: 'An error occurred, please try again',
                type: 'error'
            })
        );
    }
}

function* handleGetListWaiting(action) {
    try {
        const params = action.payload;
        const assignTo = localStorage.getItem('current_employee_id');
        params['assignTo.equals'] = assignTo;
        params['status.equals'] = 'WAITING';
        const response = yield call(getAll, params);

        yield put(leaveActions.getListWaitingSuccess(response.data));
    } catch (error) {
        yield put(leaveActions.getListWaitingFalse('An error occurred, please try again'));
    }
}

function* watchFlow() {
    yield all([
        takeLatest(leaveActions.fetchData.type, handleFetchData),
        takeLatest(leaveActions.submit.type, handleSubmit),
        takeLatest(leaveActions.getHolidays.type, handleGetAllHoliday),
        takeLatest(leaveActions.cancelLeave.type, handleCancelLeave),
        takeLatest(leaveActions.getListWaiting.type, handleGetListWaiting),
        takeLatest(leaveActions.confirmLeave.type, handleConfirmLeave),
        takeLatest(leaveActions.rejectLeave.type, handleRejectLeave)
    ]);
}

export function* leaveSaga() {
    yield fork(watchFlow);
}
