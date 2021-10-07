import blogsApi from '../fetching/blogs';
import addBlogApi from '../fetching/newBlog';

export const setBlogs = (blogs) => ({
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

export const addBlog = (blog) => ({
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