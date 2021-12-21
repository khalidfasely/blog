import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { l_comment, u_comment } from "../actions/auth";
import { startLikeComment, startUnlikeComment } from "../actions/blogPage";

export const Comment = ({ blogId, comment, uname, commentsLiked, startLikeComment, startUnlikeComment, l_comment, u_comment }) => {
    const [ buttonDis, setButtonDis ] = useState(false);
    const disableButton = () => {
        setButtonDis(true);
        setTimeout(() => {
            setButtonDis(false);
        }, 200);
    };
    const like = () => {
        disableButton();
        startLikeComment(comment.id, blogId).then(() => {
            l_comment(comment.id)
        });
    }
    const unlike = () => {
        disableButton();
        startUnlikeComment(comment.id, blogId).then(() => {
            u_comment(comment.id)
        });
    }
    return (
        <div>
            <Link data-testid='user_profile' to={`/user/${comment.created_by.id}`}>{comment.created_by.username}</Link>
            : {comment.content}
            <div>
                {comment.created_at} - {comment.likes} {
                    uname &&
                    <div>
                        {
                            commentsLiked.includes(`${comment.id}`) ?
                            <button data-testid='like_unlike_button' disabled={buttonDis} onClick={unlike}>Unlike</button> :
                            <button data-testid='like_unlike_button' disabled={buttonDis} onClick={like}>Like</button>
                        }
                    </div>
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
    commentsLiked: state.auth.commentsLiked
});

const mapDispatchToProps = (dispatch) => ({
    startLikeComment: (cid, bid) => dispatch(startLikeComment(cid, bid)),
    startUnlikeComment: (cid, bid) => dispatch(startUnlikeComment(cid, bid)),
    l_comment: (cid) => dispatch(l_comment(cid)),
    u_comment: (cid) => dispatch(u_comment(cid))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);