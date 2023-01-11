import { fork, put, take, all, takeEvery, call } from 'redux-saga/effects';
import { actionActions } from './actionSlice';
import { getAllLeaveForManager } from 'api/leave';

function* handleGetCount(action) {
    try {
        const params = {};
        params['status.equals'] = 'WAITING';
        const response = yield call(getAllLeaveForManager, params);
        yield put(
            actionActions.getCountMenuSuccess({
                leave: response?.data?.content.length || 0
            })
        );
    } catch (error) {
        yield put(actionActions.getCountMenuFalse('An error occurred, please try again'));
    }
}

function* watchFlow() {
    yield all([takeEvery(actionActions.getCountMenu.type, handleGetCount)]);
}

export function* actionSaga() {
    yield fork(watchFlow);
}
