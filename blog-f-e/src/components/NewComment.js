import React from "react";
import { Link } from "react-router-dom";

export const NewComment = (props) => {
    return (
        <div className="comments-section__form">
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
                <h5 className="comments-section__login-links">
                    <Link to='/login'>Login</Link> or <Link to='/register'>Sign In</Link> to Add a Comment!
                </h5>
            }
        </div>
    )
};

export default NewComment;