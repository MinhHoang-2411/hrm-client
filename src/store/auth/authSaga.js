import { call, delay, fork, put, take, takeLatest, all } from 'redux-saga/effects';
import { authActions } from './authSlice';
import { login, getCurrentEmployeeLogin } from 'api/login';
import { alertActions } from '../alert/alertSlice';
import { changePassword } from 'api/password';

function* handleLogin(action) {
    try {
        //yield delay(1000);
        const response = yield call(login, action.payload);
        localStorage.setItem('access_token', JSON.stringify(response.data.id_token));

        const responseEmployee = yield call(getCurrentEmployeeLogin, action.payload);
        localStorage.setItem('employee', JSON.stringify(responseEmployee.data));

        yield put(authActions.loginSuccess({ ...action.payload }));
        action.payload.onNavigate?.();
    } catch (error) {
        yield put(authActions.loginFailed(error));
        if (error.response.status === 401) {
            yield put(
                alertActions.showAlert({
                    text: action.payload?.translation('The username or password you entered did not match our records. Please try again'),
                    type: 'error'
                })
            );
        } else if (error.response.status === 400) {
            yield put(
                alertActions.showAlert({
                    text: action.payload?.translation(error.response.data.title),
                    type: 'error'
                })
            );
        } else if (error.response.status === 500) {
            yield put(
                alertActions.showAlert({
                    text: error.response.data.detail,
                    type: 'error'
                })
            );
        }
    }
}

function* handleLogout(action) {
    yield delay(500);
    localStorage.removeItem('access_token');
    localStorage.removeItem('employee');

    action.payload.onNavigate?.();
}

function* handleChangePassword(action) {
    try {
        yield call(changePassword, action.payload);
        yield put(authActions.changePasswordSuccess({ ...action.payload }));
        yield put(
            alertActions.showAlert({
                text: action.payload?.translation('Change Password successfully'),
                type: 'success'
            })
        );
    } catch (error) {
        yield put(authActions.changePasswordFail(error));
        if (error.response.status === 400) {
            yield put(
                alertActions.showAlert({
                    text: action.payload?.translation(error.response.data.title),
                    type: 'error'
                })
            );
        } else if (error.response.status === 500) {
            yield put(
                alertActions.showAlert({
                    text: error.response.data.detail,
                    type: 'error'
                })
            );
        } else {
            yield put(
                alertActions.showAlert({
                    text: 'An error occurred, please try again',
                    type: 'error'
                })
            );
        }
    }
}

function* watchLoginFlow() {
    yield all([
        takeLatest(authActions.login.type, handleLogin),
        takeLatest(authActions.logout.type, handleLogout),
        takeLatest(authActions.changePassword.type, handleChangePassword)
    ]);
}

export function* authSaga() {
    yield fork(watchLoginFlow);
}
