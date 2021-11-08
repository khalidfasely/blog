import userPage from '../fetching/userPage';

export const setUserPage = ({ uid, blogs, bio }) => ({
    type: 'SET_USER_PAGE',
    user: {
        uid,
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