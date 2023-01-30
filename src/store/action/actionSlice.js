import { createSlice } from '@reduxjs/toolkit';
import config from 'config';

const initialState = {
    isOpen: [], // for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
    subMenu: [],
    countMenu: {}
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
        },

        // COUNT LEAVE WAITING
        getCountMenu(state, action) {},
        getCountMenuSuccess(state, action) {
            state.countMenu = action?.payload || 0;
        },
        getCountMenuFalse(state, action) {
            console.error(action.payload);
        },

        minusCountMenu(state, action) {
            if (state.countMenu[action.payload] > 0) {
                state.countMenu[action.payload] = state.countMenu[action.payload] - 1;
            }
        },
        plusCountMenu(state, action) {
            state.countMenu[action.payload] = state.countMenu[action.payload] + 1;
        }
    }
});

// Actions
export const actionActions = actionSlice.actions;

// Reducer
const actionReducer = actionSlice.reducer;
export default actionReducer;
