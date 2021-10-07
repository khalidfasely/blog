import user from '../fetching/user';
import loginApi from '../fetching/login';
import logoutApi from '../fetching/logout';
import registerApi from '../fetching/register';

export const setUser = ({ uname } = {}) => ({
    type: 'SET_USER',
    uname
});

export const startSetUser = () => {
    return (dispatch) => {
        return user().then((result) => {
            if(result) {
                dispatch(setUser({ uname: result.user }));
                return result;
            };
        });
    };
};

export const login = ({ uname }) => ({
    type: 'LOGIN',
    uname
});

export const startLogin = ({ username, password }) => {
    return (dispatch) => {
        return loginApi({ username, password }).then((result) => {
            dispatch(login({ uname: result.user }));
            return result;
        });
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return (dispatch) => {
        return logoutApi().then((result) => {
            dispatch(logout());
            return result;
        });
    };
};

export const register = ({ uname }) => ({
    type: 'REGISTER',
    uname
});

export const startRegister = ({ username, email, password, confirmation }) => {
    return (dispatch) => {
        return registerApi({ username, email, password, confirmation }).then(result => {
            if(result.message === "Register") {
                dispatch(register({ uname: username }));
            }
            return result;
        });
    };
};