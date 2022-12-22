import assetRequestApi from 'api/asset-request/index';
import { all, call, fork, put, takeLatest, delay } from 'redux-saga/effects';
import { assetRequestActions } from './assetRequestSlice';

function* handleFetchData(action) {
    try {
        const params = action.payload;
        const paramsApi = { ...params };
        if (paramsApi?.sort_field) {
            paramsApi.sort = `${paramsApi.sort_field},${paramsApi.sort_type}`;
        }
        const response = yield call(assetRequestApi.getAllAssetRequest, paramsApi);
        yield put(assetRequestActions.fetchDataSuccess(response));
    } catch (error) {
        yield put(assetRequestActions.fetchDataFail('An error occurred, please try again'));
    }
}
function* assetFlow() {
    yield all([takeLatest(assetRequestActions.fetchData.type, handleFetchData)]);
}

export function* assetRequestSaga() {
    yield fork(assetFlow);
}
