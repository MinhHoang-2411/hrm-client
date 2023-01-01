import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions } from './authSlice';
import { login, getCurrentEmployeeLogin } from 'api/login';

function* handleLogin(payload) {
    try {
        //yield delay(1000);
        const response = yield call(login, payload);
        localStorage.setItem('access_token', JSON.stringify(response.data.id_token));
        yield put(authActions.loginSuccess({ ...payload }));
        const responseEmployee = yield call(getCurrentEmployeeLogin, payload);
        localStorage.setItem('role', responseEmployee.data.position);
        localStorage.setItem('current_employee_id', responseEmployee.data.id);
        localStorage.setItem('full_name', responseEmployee.data.user.firstName + ' ' + responseEmployee.data.user.lastName);

        payload.onNavigate?.();
    } catch (error) {
        console.error(error);
        yield put(authActions.loginFailed(error));
    }
}

function* handleLogout(payload) {
    yield delay(500);
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('current_employee_id');
    localStorage.removeItem('full_name');

    payload.onNavigate?.();
}

function* watchLoginFlow() {
    while (true) {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));

        if (!isLoggedIn) {
            const action = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload);
        }

        const action = yield take(authActions.logout.type);
        yield call(handleLogout, action.payload);
    }
}

export function* authSaga() {
    yield fork(watchLoginFlow);
}
