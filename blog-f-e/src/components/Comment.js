import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { startLikeComment, startUnlikeComment, unlikeComment } from "../actions/blogPage";

const Comment = ({ blogId, comment, uname, commentsLiked, startLikeComment, startUnlikeComment }) => {
    const [ buttonDis, setButtonDis ] = useState(false);
    const disableButton = () => {
        setButtonDis(true);
        setTimeout(() => {
            setButtonDis(false);
        }, 200);
    };
    const like = () => {
        disableButton();
        startLikeComment(comment.id, blogId)
    }
    const unlike = () => {
        disableButton();
        startUnlikeComment(comment.id, blogId)
    }
    return (
        <div>
            <Link to={`/user/${comment.created_by.id}`}>{comment.created_by.username}</Link>: {comment.content}
            <p>{comment.created_at} - {comment.likes} {
                uname &&
                <div>
                    {
                        commentsLiked.includes(`${comment.id}`) ?
                        <button disabled={buttonDis} onClick={unlike}>Unlike</button> :
                        <button disabled={buttonDis} onClick={like}>Like</button>
                    }
                </div>
            }
            </p>
        </div>
    )
};

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
    commentsLiked: state.auth.commentsLiked
});

const mapDispatchToProps = (dispatch) => ({
    startLikeComment: (cid, bid) => dispatch(startLikeComment(cid, bid)),
    startUnlikeComment: (cid, bid) => dispatch(startUnlikeComment(cid, bid))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);