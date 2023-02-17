import { submitLeave, getAll, getAllHoliday, cancelLeave, rejectLeave, confirmLeave, getAllLeaveForManager } from 'api/leave';
import { all, call, fork, put, takeEvery, takeLatest, take, delay } from 'redux-saga/effects';
import { leaveActions } from './leaveSlice';
import { alertActions } from '../alert/alertSlice';
import { actionActions } from 'store/action/actionSlice';

function* handleSubmit(action) {
    try {
        yield call(submitLeave, action.payload);
        yield put(leaveActions.submitSuccess('success'));
        yield put(actionActions.plusCountMenu('leave'));
    } catch (error) {
        yield put(leaveActions.submitFailed(error?.response?.data?.title));
    } finally {
        yield delay(2000);
        yield put(leaveActions.cancelAlert(null));
    }
}

function* handleFetchData(action) {
    try {
        const params = action.payload;
        params['sort'] = 'createdDate,DESC';
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
        yield put(actionActions.minusCountMenu('leave'));
        yield put(
            alertActions.showAlert({
                text: params.translation('Cancel leave successfully'),
                type: 'success'
            })
        );
    } catch (error) {
        yield put(leaveActions.cancelLeaveFail());
        if (error.response.status === 400) {
            yield put(
                alertActions.showAlert({
                    text: params.translation('You cannot cancel this leave because the manager has approved/ rejected it'),
                    type: 'error'
                })
            );
        } else {
            yield put(
                alertActions.showAlert({
                    text: params.translation('An error occurred, please try again'),
                    type: 'error'
                })
            );
        }
    }
}

function* handleRejectLeave(action) {
    try {
        const params = action.payload;
        yield call(rejectLeave, params);

        yield put(leaveActions.rejectLeaveSuccess());
        yield put(actionActions.minusCountMenu('leave'));

        yield put(
            alertActions.showAlert({
                text: params.translation('Reject leave successfully'),
                type: 'success'
            })
        );
    } catch (error) {
        yield put(leaveActions.rejectLeaveFail());
        if (error.response.status === 400) {
            yield put(
                alertActions.showAlert({
                    text: params.translation('You can not take this action because the creator canceled this leave'),
                    type: 'error'
                })
            );
        } else {
            yield put(
                alertActions.showAlert({
                    text: params.translation('An error occurred, please try again'),
                    type: 'error'
                })
            );
        }
    }
}

function* handleConfirmLeave(action) {
    try {
        const params = action.payload;
        yield call(confirmLeave, params);

        yield put(leaveActions.confirmLeaveSuccess());
        yield put(actionActions.minusCountMenu('leave'));
        yield put(
            alertActions.showAlert({
                text: params.translation('Confirm leave successfully'),
                type: 'success'
            })
        );
    } catch (error) {
        yield put(leaveActions.confirmLeaveFail());
        if (error.response.status === 400) {
            yield put(
                alertActions.showAlert({
                    text: params.translation('You can not take this action because the creator canceled this leave'),
                    type: 'error'
                })
            );
        } else {
            yield put(
                alertActions.showAlert({
                    text: params.translation('An error occurred, please try again'),
                    type: 'error'
                })
            );
        }
    }
}

function* handleGetListWaiting(action) {
    try {
        const params = action.payload;
        const assignTo = JSON.parse(localStorage.getItem('employee')).id;
        params['assignTo.equals'] = assignTo;
        params['status.equals'] = 'WAITING';
        params['sort'] = 'lastModifiedDate,DESC';
        const response = yield call(getAllLeaveForManager, params);

        yield put(leaveActions.getListWaitingSuccess(response.data));
    } catch (error) {
        yield put(leaveActions.getListWaitingFalse('An error occurred, please try again'));
    }
}

function* handleGetListLeaveForManager(action) {
    try {
        const params = action.payload;
        const assignTo = JSON.parse(localStorage.getItem('employee')).id;
        params['assignTo.equals'] = assignTo;
        params['status.in'] = 'REJECTED,CONFIRMED,APPROVED';
        params['sort'] = 'lastModifiedDate,DESC';
        const response = yield call(getAllLeaveForManager, params);
        yield put(leaveActions.fetchDataForManagerSuccess(response.data));
    } catch (error) {
        yield put(leaveActions.fetchDataForManagerFail('An error occurred, please try again'));
    }
}

function* handleLoadMoreWaiting(action) {
    try {
        const params = action.payload;
        const assignTo = JSON.parse(localStorage.getItem('employee')).id;
        params['assignTo.equals'] = assignTo;
        params['status.equals'] = 'WAITING';
        params['sort'] = 'lastModifiedDate,DESC';
        const response = yield call(getAllLeaveForManager, params);

        yield put(leaveActions.loadMoreWaitingSuccess(response.data));
    } catch (error) {
        yield put(leaveActions.loadMoreWaitingFail('An error occurred, please try again'));
    }
}

function* handleLoadMore(action) {
    try {
        const params = action.payload;
        params['sort'] = 'lastModifiedDate,DESC';
        const response = yield call(getAllLeaveForManager, params);

        yield put(leaveActions.loadMoreSuccess(response.data));
    } catch (error) {
        yield put(leaveActions.loadMoreFail('An error occurred, please try again'));
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
        takeLatest(leaveActions.rejectLeave.type, handleRejectLeave),
        takeLatest(leaveActions.fetchDataForManager.type, handleGetListLeaveForManager),
        takeLatest(leaveActions.loadMoreWaiting.type, handleLoadMoreWaiting),
        takeLatest(leaveActions.loadMore.type, handleLoadMore)
    ]);
}

export function* leaveSaga() {
    yield fork(watchFlow);
}
