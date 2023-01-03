import { call, delay, fork, put, take, takeLatest, all } from 'redux-saga/effects';
import { authActions } from './authSlice';
import { login, getCurrentEmployeeLogin } from 'api/login';
import { alertActions } from '../alert/alertSlice';

function* handleLogin(action) {
    try {
        //yield delay(1000);
        const response = yield call(login, action.payload);
        localStorage.setItem('access_token', JSON.stringify(response.data.id_token));

        const responseEmployee = yield call(getCurrentEmployeeLogin, action.payload);
        localStorage.setItem('role', responseEmployee.data.position);
        localStorage.setItem('current_employee_id', responseEmployee.data.id);
        localStorage.setItem('full_name', responseEmployee.data.user.firstName + ' ' + responseEmployee.data.user.lastName);

        yield put(authActions.loginSuccess({ ...action.payload }));
        action.payload.onNavigate?.();
    } catch (error) {
        yield put(authActions.loginFailed(error));
        if (error.response.status === 401) {
            yield put(
                alertActions.showAlert({
                    text: 'The username or password you entered did not match our records. Please try again',
                    type: 'error'
                })
            );
        } else if (error.response.status === 400) {
            yield put(
                alertActions.showAlert({
                    text: 'The user login does not match with any employee in database',
                    type: 'error'
                })
            );
        }
    }
}

function* handleLogout(action) {
    yield delay(500);
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('current_employee_id');
    localStorage.removeItem('full_name');

    action.payload.onNavigate?.();
}

function* watchLoginFlow() {
    yield all([takeLatest(authActions.login.type, handleLogin), takeLatest(authActions.logout.type, handleLogout)]);
}

export function* authSaga() {
    yield fork(watchLoginFlow);
}
