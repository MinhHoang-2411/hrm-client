import { all, fork, put, takeEvery, delay } from 'redux-saga/effects';
import { alertActions } from './alertSlice';

function* handleShowAlert(action) {
    try {
        yield delay(2000);
        yield put(alertActions.cancelAlert());
    } catch (error) {
        console.error({ error });
    }
}

function* alertFlow() {
    yield all([takeEvery(alertActions.showAlert.type, handleShowAlert)]);
}

export function* alertSaga() {
    yield fork(alertFlow);
}
