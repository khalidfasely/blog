import user from '../fetching/user';
import loginApi from '../fetching/login';
import logoutApi from '../fetching/logout';
import registerApi from '../fetching/register';

export const setUser = ({ uname, commentsLiked, blogsLiked } = {}) => ({
    type: 'SET_USER',
    uname,
    commentsLiked,
    blogsLiked
});

export const startSetUser = () => {
    return (dispatch) => {
        return user().then((result) => {
            if(result) {
                dispatch(setUser({ uname: result.user, commentsLiked: result.likes, blogsLiked: result.likes_b }));
                return result;
            };
        });
    };
};

export const login = ({ uname, commentsLiked, blogsLiked }) => ({
    type: 'LOGIN',
    uname,
    commentsLiked,
    blogsLiked
});

export const startLogin = ({ username, password }) => {
    return (dispatch) => {
        return loginApi({ username, password }).then((result) => {
            dispatch(login({ uname: result.user, commentsLiked: result.likes, blogsLiked: result.likes_b }));
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

export const register = ({ uname, commentsLiked, blogsLiked }) => ({
    type: 'REGISTER',
    uname,
    commentsLiked,
    blogsLiked
});

export const startRegister = ({ username, email, password, confirmation }) => {
    return (dispatch) => {
        return registerApi({ username, email, password, confirmation }).then(result => {
            if(result.message === "Register") {
                dispatch(register({ uname: username, commentsLiked: result.likes, blogsLiked: result.likes_b }));
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

export const l_blog = (bid) => ({
    type: 'L_BLOG', //??
    bid
});

export const u_blog = (bid) => ({
    type: 'U_BLOG', //???
    bid
});