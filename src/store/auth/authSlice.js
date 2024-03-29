import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false, // logged
    logging: false, // loading
    currentUser: undefined, // info user if login success
    isPasswordChanging: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.logging = true;
        },
        loginSuccess(state, action) {
            state.isLoggedIn = true;
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, action) {
            state.logging = false;
        },

        logout(state, action) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },

        changePassword(state, action) {
            state.isPasswordChanging = true;
        },
        changePasswordSuccess(state, action) {
            state.isPasswordChanging = false;
        },
        changePasswordFail(state, action) {
            state.isPasswordChanging = false;
        }
    }
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLogging = (state) => state.auth.logging;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
