import { all } from 'redux-saga/effects';
import { actionSaga } from 'store/action/actionSaga';
import { authSaga } from 'store/auth/authSaga';
import { leaveSaga } from 'store/leave/leaveSaga';

export default function* rootSaga() {
    yield all([authSaga(), actionSaga(), leaveSaga()]);
}
