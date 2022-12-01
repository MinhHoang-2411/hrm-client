import { createSlice } from '@reduxjs/toolkit';
import config from 'config';

const initialState = {
    isOpen: [], // for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
};

const actionSlice = createSlice({
    name: 'action',
    initialState,
    reducers: {
        openMenu(state, action) {
            state.isOpen = [action.payload.id];
        },
        setMenu(state, action) {
            state.opened = action.payload.opened;
        },
        setFontFamily(state, action) {
            state.fontFamily = action.payload.fontFamily;
        },

        setBorderRadius(state, action) {
            state.borderRadius = action.payload.borderRadius;
        }
    }
});

// Actions
export const actionActions = actionSlice.actions;

// Reducer
const actionReducer = actionSlice.reducer;
export default actionReducer;
