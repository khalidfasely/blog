import React from "react";
import Comment from "./Comment";

export const CommentsList = ({ comments, blogId }) => {
    return (
        <div className="comments-section__list">
            {
                comments.length !== 0 ?
                comments.map(comment => <Comment key={comment.id} blogId={blogId} comment={comment} />) :
                <div className="comments-section__empty-list">-NO COMMENTS-</div>
            }
        </div>
    )
};

export default CommentsList;