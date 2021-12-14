import blogPage from "../fetching/blogPage";
import newComment from "../fetching/newComment";
import likeCommentApi from "../fetching/likeComment";
import unlikeCommentApi from "../fetching/unlikeComment";
import likeBlogApi from "../fetching/likeBlog";
import unlikeBlogApi from "../fetching/unlikeBlog";
import editBlogApi from '../fetching/editBlog';

export const setBlog = ({ blog, comments = [] }) => ({
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

export const likeBlog = (bid) => ({
    type: 'LIKE_BLOG', //????
    bid
});

export const startLikeBlog = (bid) => {
    return (dispatch) => {
        return likeBlogApi(bid).then(result => {
            dispatch(likeBlog(bid));
            return result;
        });
    };
};

export const unlikeBlog = (bid) => ({
    type: 'UNLIKE_BLOG', //????
    bid
});

export const startUnlikeBlog = (bid) => {
    return (dispatch) => {
        return unlikeBlogApi(bid).then(result => {
            dispatch(unlikeBlog(bid));
            return result;
        });
    };
};

export const removeBlogFromBP = (bid) => ({
    type: 'REMOVE_BLOG_FROM_BP',
    bid
});

export const editBlog = (bid, updates) => ({
    type: 'EDIT_BLOG',
    bid,
    updates
});

export const startEditBlog = (bid, updates) => {
    return (dispatch) => {
        return editBlogApi(bid, updates).then(result => {
            dispatch(editBlog(bid, updates));
            return result;
        });
    };
};