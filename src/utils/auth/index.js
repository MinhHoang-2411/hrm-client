const AUTH_LOCAL_STORAGE_KEY = 'access_token';
const ROLE_LOCAL_STORAGE_KEY = 'role';

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
    return localStorage.getItem(ROLE_LOCAL_STORAGE_KEY);
}

export { getAuth, getCurrentPermission };
