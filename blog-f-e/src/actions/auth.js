import user from '../fetching/user';
import loginApi from '../fetching/login';
import logoutApi from '../fetching/logout';
import registerApi from '../fetching/register';

export const setUser = ({ uname, commentsLiked } = {}) => ({
    type: 'SET_USER',
    uname,
    commentsLiked
});

export const startSetUser = () => {
    return (dispatch) => {
        return user().then((result) => {
            if(result) {
                dispatch(setUser({ uname: result.user, commentsLiked: result.likes }));
                return result;
            };
        });
    };
};

export const login = ({ uname, commentsLiked }) => ({
    type: 'LOGIN',
    uname,
    commentsLiked
});

export const startLogin = ({ username, password }) => {
    return (dispatch) => {
        return loginApi({ username, password }).then((result) => {
            dispatch(login({ uname: result.user, commentsLiked: result.likes }));
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

export const register = ({ uname, commentsLiked }) => ({
    type: 'REGISTER',
    uname,
    commentsLiked
});

export const startRegister = ({ username, email, password, confirmation }) => {
    return (dispatch) => {
        return registerApi({ username, email, password, confirmation }).then(result => {
            if(result.message === "Register") {
                dispatch(register({ uname: username, commentsLiked: result.likes }));
            }
            return result;
        });
    };
};

export const l_comment = (cid) => ({
    type: 'L_COMMENT',
    cid
});

export const u_comment = (cid) => ({
    type: 'U_COMMENT',
    cid
});