import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import actionReducer from 'store/action/actionSlice';
import authReducer from 'store/auth/authSlice';
import leaveReducer from 'store/leave/leaveSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: { auth: authReducer, action: actionReducer, leave: leaveReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);
