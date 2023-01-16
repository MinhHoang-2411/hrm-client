const AUTH_LOCAL_STORAGE_KEY = 'access_token';
const EMPLOYEE_LOCAL_STORAGE_KEY = 'employee';

const getAuth = () => {
    if (!localStorage) {
        return;
    }

    const lsValue = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
    if (!lsValue) {
        return;
    }

    try {
        const auth = JSON.parse(lsValue);
        if (auth) {
            // You can easily check auth_token expiration also
            return auth;
        }
    } catch (error) {
        console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
    }
};

function getCurrentPermission() {
    return JSON.parse(localStorage.getItem(EMPLOYEE_LOCAL_STORAGE_KEY)).position.toString();
}

const handleLogout = () => {
    if (window.location.pathname !== '/login') {
        localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
        localStorage.removeItem(EMPLOYEE_LOCAL_STORAGE_KEY);
        window.location.href = '/login';
    }
};

export { getAuth, getCurrentPermission, handleLogout };
