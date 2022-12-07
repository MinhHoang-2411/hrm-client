import { submitLeave } from 'api/leave';
import { call, fork, put, take } from 'redux-saga/effects';
import { leaveActions } from './leaveSlice';

function* handleSubmit(payload) {
    try {
        yield call(submitLeave, payload);
        yield put(leaveActions.submitSuccess('success'));
    } catch (error) {
        yield put(leaveActions.submitFailed('failed'));
    }
}

function* watchFlow() {
    while (true) {
        const action = yield take(leaveActions.submit.type);
        yield call(handleSubmit, action.payload);
    }
}

export function* leaveSaga() {
    yield fork(watchFlow);
}
