import React from "react";
import {ReactComponent as ReactLikeIcon} from '../images/heart-regular.svg';
import {ReactComponent as ReactUnlikeIcon} from '../images/heart-solid.svg';

export const LikeUnlikeBlog = (props) => {
    return (
        <div>
            {
                props.uname && (
                    props.blogsLiked.includes(props.bid) ?
                    <a
                        className="unlike-container"
                        data-testid='like_unlike_blog'
                        disabled={props.buttonDis}
                        onClick={props.unlike_b}
                    >
                        <abbr title='Unlike Blog'>
                            <ReactUnlikeIcon className='unlike-icon' />
                        </abbr>
                    </a> :
                    <a
                        className="like-container"
                        data-testid='like_unlike_blog'
                        disabled={props.buttonDis}
                        onClick={props.like_b}
                    >
                        <abbr title="Like Blog">
                            <ReactLikeIcon className='like-icon' />
                        </abbr>
                    </a>
                )
            }
        </div>
    )
};

export default LikeUnlikeBlog;