import userPage from '../fetching/userPage';
import editProfileApi from '../fetching/editProfile';

export const setUserPage = ({ uid, uinfo, blogs, bio } = {}) => ({
    type: 'SET_USER_PAGE',
    user: {
        uid,
        uinfo,
        bio,
        blogs
    }
});

export const startSetUserPage = (id) => {
    return (dispatch) => {
        return userPage(id).then((result) => {
            dispatch(setUserPage(result));
            return result;
        });
    };
};

export const addBlogToProfile = (blog, id) => ({
    type: 'ADD_BLOG_PROFILE',
    blog,
    id
});

export const removeBlogFromUP = (uname, bid) => ({
    type: 'REMOVE_BLOG_FROM_UP',
    uname,
    bid
});

export const editBlogFromUP = ({ uname, bid }, updates) => ({
    type: 'EDIT_BLOG_FROM_UP',
    uname,
    bid,
    updates
});

export const editProfile = (uname, updates) => ({
    type: 'EDIT_PROFILE_INFO',
    uname,
    updates
});

export const startEditProfile = (uname, updates) => {
    return (dispatch) => {
        return editProfileApi(uname, updates).then((result) => {
            dispatch(editProfile(uname, updates));
            return result;
        });
    };
};