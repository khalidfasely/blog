import blogPage from "../fetching/blogPage";

export const setBlog = ({ blog, comments }) => ({
    type: 'SET_BLOG',
    blog: {
        ...blog,
        comments
    }
});

export const startSetBlog = (id) => {
    return (dispatch) => {
        return blogPage(id).then((result) => {
            dispatch(setBlog(result));
            return result;
        });
    };
};