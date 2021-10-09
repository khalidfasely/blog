import blogPage from "../fetching/blogPage";

export const setBlog = (blog) => ({
    type: 'SET_BLOG',
    blog
});

export const startSetBlog = (id) => {
    return (dispatch) => {
        return blogPage(id).then((result) => {
            dispatch(setBlog(result.blog));
            return result;
        });
    };
};