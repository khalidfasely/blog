import React from "react";

export const LikeUnlikeBlog = (props) => {
    return (
        <div>
            {
                props.uname && (
                    props.blogsLiked.includes(props.bid) ?
                    <button
                        data-testid='like_unlike_blog'
                        disabled={props.buttonDis}
                        onClick={props.unlike_b}
                    >
                        Unlike
                    </button> :
                    <button
                        data-testid='like_unlike_blog'
                        disabled={props.buttonDis}
                        onClick={props.like_b}
                    >
                        Like
                    </button>
                )
            }
        </div>
    )
};

export default LikeUnlikeBlog;