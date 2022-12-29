import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import actionReducer from 'store/action/actionSlice';
import authReducer from 'store/auth/authSlice';
import leaveReducer from 'store/leave/leaveSlice';
import assetReducer from 'store/asset/assetSlice';
import alertReducer from 'store/alert/alertSlice';
import rootSaga from './rootSaga';
import assetRequestReducer from 'store/asset-request/assetRequestSlice';
import employeeReducer from 'store/employee/employeeSlice';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        auth: authReducer,
        action: actionReducer,
        leave: leaveReducer,
        asset: assetReducer,
        alert: alertReducer,
        assetRequest: assetRequestReducer,
        employee: employeeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);
