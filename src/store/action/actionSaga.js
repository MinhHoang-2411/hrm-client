import { fork, put, take } from 'redux-saga/effects';
import { actionActions } from './actionSlice';

function* handleSetMenu(payload) {
    yield put(actionActions.setMenu(payload));
}
function* handleOpenMenu(payload) {
    yield put(actionActions.openMenu(payload));
}
function* handleBorderMenu(payload) {
    yield put(actionActions.setBorderRadius(payload));
}
function* handleFontFamily(payload) {
    yield put(actionActions.setFontFamily(payload));
}

function* watchFlow() {
    while (true) {
        const actionSetMenu = yield take(actionActions.setMenu.type);
        yield fork(handleSetMenu, actionSetMenu.payload);

        const actionOpenMenu = yield take(actionActions.openMenu.type);
        yield fork(handleOpenMenu, actionOpenMenu.payload);

        const actionSetBorderRadius = yield take(actionActions.setBorderRadius.type);
        yield fork(handleBorderMenu, actionSetBorderRadius.payload);

        const actionSetFontFamily = yield take(actionActions.setFontFamily.type);
        yield fork(handleFontFamily, actionSetFontFamily.payload);
    }
}

export function* actionSaga() {
    yield fork(watchFlow);
}
