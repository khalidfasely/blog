import React from "react";
import { Link } from "react-router-dom";

export const NewComment = (props) => {
    return (
        <div>
            <h5>Add comments:</h5>
            {
                props.uname ?
                <form data-testid='new_comment_form' onSubmit={props.onFormSubmit}>
                    <textarea
                        data-testid='new_comment_input'
                        placeholder='Comment'
                        onChange={props.onCommentChange}
                        value={props.newComment}
                    />
                    <button disabled={!props.newComment.replace(/\s/g, '')}>Add Comment</button>
                </form> :
                <h5>
                    <Link to='/login'>Login</Link> or <Link to='/register'>Sign In</Link> to Add a Comment!
                </h5>
            }
        </div>
    )
};

export default NewComment;