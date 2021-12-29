import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { l_comment, u_comment } from "../actions/auth";
import { startLikeComment, startUnlikeComment } from "../actions/blogPage";
import { ReactComponent as ReactLikeIcon } from '../images/heart-regular.svg';
import { ReactComponent as ReactUnlikeIcon } from '../images/heart-solid.svg';

export const Comment = ({ blogId, comment, uname, commentsLiked, startLikeComment, startUnlikeComment, l_comment, u_comment }) => {
    const [ buttonDis, setButtonDis ] = useState(false);
    const [ likes, setLikes ] = useState(parseInt(comment.likes));
    const disableButton = () => {
        setButtonDis(true);
        setTimeout(() => {
            setButtonDis(false);
        }, 200);
    };
    const like = () => {
        disableButton();
        startLikeComment(comment.id, blogId).then(() => {
            l_comment(comment.id);
            setLikes(likes + 1);
        });
    }
    const unlike = () => {
        disableButton();
        startUnlikeComment(comment.id, blogId).then(() => {
            u_comment(comment.id);
            setLikes(likes - 1);
        });
    }
    return (
        <div className="comments-section__item">
            <div className='comments-section__user-item'>
                <Link data-testid='user_profile' to={`/user/${comment.created_by.id}`}>
                    <p className='comments-section__username-item'>
                        {comment.created_by.username}
                    </p>
                </Link>
                <p className='comments-section__time-item'>{comment.created_at}</p>
            </div>
            <div>
                <div className="comments-section__content-item">{comment.content}</div> 
                <div className="comments-section__likes-container">
                    <div className="comments-section__likes-count-item">
                        {likes}
                    </div>
                    {
                        uname &&
                        <div>
                            {
                                commentsLiked.includes(`${comment.id}`) ?
                                <a data-testid='like_unlike_button' disabled={buttonDis} onClick={unlike}><ReactUnlikeIcon className='unlike-comment-icon' /></a> :
                                <a data-testid='like_unlike_button' disabled={buttonDis} onClick={like}><ReactLikeIcon className='like-comment-icon' /></a>
                            }
                        </div>
                    }
                </div>
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