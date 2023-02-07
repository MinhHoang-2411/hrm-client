import { createSlice } from '@reduxjs/toolkit';

const defaultValue = {
    isShow: false,
    type: null,
    title: null,
    content: null,
    onAction: null,
    onCancel: null,
    url: null,
    buttonText: null
};

const initialState = {
    modalConfirm: defaultValue,
    modalError: defaultValue,
    modalWaring: defaultValue
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal(state, action) {
            state[action.payload.type] = {
                ...state[action.payload.type],
                ...action.payload,
                isShow: true
            };
        },
        closeModal(state, action) {
            state[action.payload.type] = defaultValue;
        }
    }
});

// Actions
export const modalActions = modalSlice.actions;

// Reducer
const modalReducer = modalSlice.reducer;
export default modalReducer;
