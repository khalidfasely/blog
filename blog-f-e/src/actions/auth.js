import user from '../fetching/user';
import loginApi from '../fetching/login';
import logoutApi from '../fetching/logout';
import registerApi from '../fetching/register';
import saveBlogApi from '../fetching/saveBlog';
import unsaveBlogApi from '../fetching/unsaveBlog';

export const setUser = ({ uname, uid, commentsLiked, blogsLiked, blogsSaved } = {}) => ({
    type: 'SET_USER',
    uname,
    uid,
    commentsLiked,
    blogsLiked,
    blogsSaved
});

export const startSetUser = () => {
    return (dispatch) => {
        return user().then((result) => {
            if(result) {
                dispatch(setUser({
                    uname: result.user,
                    uid: result.uid,
                    commentsLiked: result.likes,
                    blogsLiked: result.likes_b,
                    blogsSaved: result.blogs_saved
                }));
                return result;
            };
        });
    };
};

export const login = ({ uname, uid, commentsLiked, blogsLiked, blogsSaved } = {}) => ({
    type: 'LOGIN',
    uname,
    uid,
    commentsLiked,
    blogsLiked,
    blogsSaved
});

export const startLogin = ({ username, password }) => {
    return (dispatch) => {
        return loginApi({ username, password }).then((result) => {
            dispatch(login({
                uname: result.user,
                uid: result.uid,
                commentsLiked: result.likes,
                blogsLiked: result.likes_b,
                blogsSaved: result.blogs_saved
            }));
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

export const register = ({ uname, uid, commentsLiked, blogsLiked, blogsSaved } = {}) => ({
    type: 'REGISTER',
    uname,
    uid,
    commentsLiked,
    blogsLiked,
    blogsSaved
});

export const startRegister = ({ username, email, password, confirmation }) => {
    return (dispatch) => {
        return registerApi({ username, email, password, confirmation }).then(result => {
            if(result.message === "Register") {
                dispatch(register({
                    uname: username,
                    uid: result.uid,
                    commentsLiked: result.likes,
                    blogsLiked: result.likes_b,
                    blogsSaved: result.blogs_saved
                }));
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

export const s_blog = (bid) => ({
    type: 'S_BLOG',
    bid
});

//export const startSaveBlog = (bid) => {
//    return (dispatch) => {
//        return saveBlogApi(bid).then((result) => {
//            dispatch(saveBlog(bid));
//            return result;
//        });
//    };
//};

export const u_s_blog = (bid) => ({
    type: 'U_S_BLOG',
    bid
});

//export const startUnsaveBlog = (bid) => {
//    return (dispatch) => {
//        return unsaveBlogApi(bid).then((result) => {
//            dispatch(unsaveBlog(bid));
//            return result;
//        });
//    };
//};