import blogsApi from '../fetching/blogs';
import addBlogApi from '../fetching/newBlog';
import deleteBlogApi from '../fetching/deleteBlog';

export const setBlogs = (blogs = []) => ({
    type: 'SET_BLOGS',
    blogs
});

export const startSetBlogs = () => {
    return (dispatch) => {
        return blogsApi().then((result) => {
            dispatch(setBlogs(result.blogs));
            return result;
        });
    };
};

export const addBlog = (blog = {}) => ({
    type: 'ADD_BLOG',
    blog
});

export const startAddBlog = (blog) => {
    return (dispatch) => {
        return addBlogApi(blog).then((result) => {
            dispatch(addBlog(result.blog));
            return result;
        });
    };
};

export const deleteBlog = (bid) => ({
    type: 'DELETE_BLOG',
    bid
});

export const startDeleteBlog = (bid) => {
    return (dispatch) => {
        return deleteBlogApi(bid).then(result => {
            dispatch(deleteBlog(bid));
            return result;
        });
    };
};

export const editBlogFromBP = (bid, updates = {}) => ({
    type: 'EDIT_BLOG_FROM_BP',
    bid,
    updates
});