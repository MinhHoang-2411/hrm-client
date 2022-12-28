import employeeApi from 'api/employee';
import { all, call, fork, put, takeEvery, takeLatest, take, delay } from 'redux-saga/effects';
import { employeeActions } from './employeeSlice';

function* handleFetchData(action) {
    try {
        const params = action.payload;
        const response = yield call(employeeApi.getAllEmployee, params);
        yield put(employeeActions.fetchDataSuccess(response));
    } catch (error) {
        yield put(employeeActions.fetchDataFalse('An error occurred, please try again'));
    }
}

function* watchFlow() {
    yield all([takeLatest(employeeActions.fetchData.type, handleFetchData)]);
}

export function* employeeSaga() {
    yield fork(watchFlow);
}
