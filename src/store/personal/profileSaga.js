import { profileAction } from './profileSlice';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import employeeApi from 'api/employee';

function* handleGetProfileData(action) {
    try {
        const response = yield call(employeeApi.getEmployeeById, action.payload.currentUserId);
        yield put(profileAction.fetchDataSuccess(response));
    } catch (error) {
        yield put(profileAction.fetchDataFalse());
    }
}

function* watchFlow() {
    yield all([takeLatest(profileAction.fetchData.type, handleGetProfileData)]);
}

export function* profileSaga() {
    yield fork(watchFlow);
}
