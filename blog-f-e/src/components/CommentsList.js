import React from "react";
import Comment from "./Comment";

export const CommentsList = ({ comments, blogId }) => {
    return (
        <div>
            <h5>Comments:</h5>
            {
                comments.length !== 0 ?
                comments.map(comment => <Comment key={comment.id} blogId={blogId} comment={comment} />) :
                <div>-NO COMMENTS-</div>
            }
        </div>
    )
};

export default CommentsList;