import blogPage from "../fetching/blogPage";
import newComment from "../fetching/newComment";
import likeCommentApi from "../fetching/likeComment";
import unlikeCommentApi from "../fetching/unlikeComment";

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

export const likeComment = (cid, bid) => ({
    type: 'LIKE_COMMENT',
    cid,
    bid
});

export const startLikeComment = (cid, bid) => {
    return (dispatch) => {
        return likeCommentApi(cid).then(result => {
            dispatch(likeComment(cid, bid));
            return result;
        });
    };
};

export const unlikeComment = (cid, bid) => ({
    type: 'UNLIKE_COMMENT',
    cid,
    bid
});

export const startUnlikeComment = (cid, bid) => {
    return (dispatch) => {
        return unlikeCommentApi(cid).then(result => {
            dispatch(unlikeComment(cid, bid));
            return result;
        });
    };
};