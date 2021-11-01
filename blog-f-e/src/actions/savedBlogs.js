import savedBlogsApi from '../fetching/savedBlogs';

export const setSavedBlogs = (blogs) => ({
    type: 'SET_SAVED_BLOGS',
    blogs
});

export const startSetSavedBlogs = () => {
    return (dispatch) => {
        return savedBlogsApi().then((result) => {
            dispatch(setSavedBlogs(result.blogs_saved));
            return result;
        });
    };
};

export const unsetSavedBlogs = () => ({
    type: 'UNSET_SAVED_BLOGS'
});