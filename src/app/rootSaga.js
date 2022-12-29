import { all } from 'redux-saga/effects';
import { actionSaga } from 'store/action/actionSaga';
import { authSaga } from 'store/auth/authSaga';
import { leaveSaga } from 'store/leave/leaveSaga';
import { assetSaga } from 'store/asset/assetSaga';
import { alertSaga } from 'store/alert/alertSaga';
import { assetRequestSaga } from 'store/asset-request/assetRequestSaga';
import { employeeSaga } from 'store/employee/employeeSaga';

export default function* rootSaga() {
    yield all([authSaga(), actionSaga(), leaveSaga(), assetSaga(), alertSaga(), assetRequestSaga(), employeeSaga()]);
}
