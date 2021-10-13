import blogPage from "../fetching/blogPage";
import newComment from "../fetching/newComment";

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

export const addComment = (id, comment) => ({
    type: 'ADD_COMMENT',
    id,
    comment
});

export const startAddComment = ({ blog_id, comment }) => {
    return (dispatch) => {
        return newComment(comment, blog_id).then(result => {
            //if(result.message === 'Comment Added') {
            dispatch(addComment(blog_id, result.comment));   
            //}
            return result;
        });
    };
};