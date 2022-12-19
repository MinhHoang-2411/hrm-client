import assetApi from 'api/asset/index';
import { all, call, fork, put, takeLatest, delay } from 'redux-saga/effects';
import { assetActions } from './assetSlice';
import { alertActions } from 'store/alert/alertSlice';

function* handleFetchData(action) {
    try {
        const params = action.payload;
        const paramsApi = { ...params };
        if (paramsApi?.sort_field) {
            paramsApi.sort = `${paramsApi.sort_field},${paramsApi.sort_type}`;
        }
        const response = yield call(assetApi.getAllAssetModel, paramsApi);
        yield put(assetActions.fetchDataSuccess(response));
    } catch (error) {
        yield put(assetActions.fetchDataFalse('An error occurred, please try again'));
    }
}

function* handleGetCategory(action) {
    try {
        const params = action.payload;
        const response = yield call(assetApi.getAllCategory, params);

        yield put(assetActions.getCategorySuccess(response));
    } catch (error) {
        yield put(assetActions.getCategoryFalse('An error occurred, please try again'));
    }
}

function* handleGetModelDetail(action) {
    try {
        const params = action.payload;
        const response = yield call(assetApi.getModelDetail, params);
        yield put(assetActions.getModelDetailSuccess(response));
    } catch (error) {
        yield put(assetActions.getModelDetailFail('An error occurred, please try again'));
    }
}

function* handleSubmit(action) {
    try {
        yield call(assetApi.submitRequest, action.payload);
        yield put(assetActions.submitSuccess('success'));
        yield put(
            alertActions.showAlert({
                text: 'Request successfully',
                type: 'success'
            })
        );
    } catch (error) {
        yield put(assetActions.submitFailed('failed'));
        yield put(
            alertActions.showAlert({
                text: 'An error occurred, please try again',
                type: 'error'
            })
        );
    }
}

function* assetFlow() {
    yield all([
        takeLatest(assetActions.fetchData.type, handleFetchData),
        takeLatest(assetActions.getCategory.type, handleGetCategory),
        takeLatest(assetActions.getModelDetail.type, handleGetModelDetail),
        takeLatest(assetActions.submit.type, handleSubmit)
    ]);
}

export function* assetSaga() {
    yield fork(assetFlow);
}
