import userPage from '../fetching/userPage';

export const setUserPage = ({ uid, uinfo, blogs, bio }) => ({
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