import React from "react";

export const SaveUnsaveBlog = (props) => {
    return (
        <div>
            {
                props.uname && (
                    props.blogsSaved.includes(props.bid) ?
                    <button
                        data-testid='save_unsave_blog'
                        disabled={props.sButtonDis}
                        onClick={props.unsave_b}
                    >
                        Unsave
                    </button> :
                    <button
                        data-testid='save_unsave_blog'
                        disabled={props.sButtonDis}
                        onClick={props.save_b}
                    >
                        Save
                    </button>
                )
            }
        </div>
    )
};

export default SaveUnsaveBlog;