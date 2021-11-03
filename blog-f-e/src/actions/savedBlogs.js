import savedBlogsApi from '../fetching/savedBlogs';
import saveBlogApi from '../fetching/saveBlog';
import unsaveBlogApi from '../fetching/unsaveBlog';

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

export const saveBlog = (blog) => ({
    type: 'SAVE_BLOG',
    blog
});

export const startSaveBlog = (bid) => {
    return (dispatch) => {
        return saveBlogApi(bid).then((result) => {
            dispatch(saveBlog(result.blog));
            return result;
        });
    };
};

export const unsaveBlog = (bid) => ({
    type: 'UNSAVE_BLOG',
    bid
});

export const startUnsaveBlog = (bid) => {
    return (dispatch) => {
        return unsaveBlogApi(bid).then((result) => {
            dispatch(unsaveBlog(bid));
            return result;
        });
    };
};