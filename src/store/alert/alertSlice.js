import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    alert: false,
    typeAlert: false
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert(state, action) {
            console.log('state: ', state);
            console.log('action: ', action);
            state.alert = action.payload.text;
            state.typeAlert = action.payload.type;
            toast[state.typeAlert](state.alert, { position: toast.POSITION.TOP_RIGHT });
        },
        cancelAlert(state, action) {
            state.alert = false;
            state.typeAlert = false;
        }
    }
});

// Actions
export const alertActions = alertSlice.actions;

// Reducer
const alertReducer = alertSlice.reducer;
export default alertReducer;
