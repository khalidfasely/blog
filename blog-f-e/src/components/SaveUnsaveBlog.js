import React from "react";
import {ReactComponent as ReactSaveIcon} from '../images/bookmark-regular.svg';
import {ReactComponent as ReactUnsaveIcon} from '../images/bookmark-solid.svg';


export const SaveUnsaveBlog = (props) => {
    return (
        <div>
            {
                props.uname && (
                    props.blogsSaved.includes(props.bid) ?
                    <a
                        className="unsave-container"
                        data-testid='save_unsave_blog'
                        disabled={props.sButtonDis}
                        onClick={props.unsave_b}
                    >
                        <abbr title="Unsave Blog">
                            <ReactUnsaveIcon className='unsave-icon' />
                        </abbr>
                    </a> :
                    <a
                        className="save-container"
                        data-testid='save_unsave_blog'
                        disabled={props.sButtonDis}
                        onClick={props.save_b}
                    >
                        <abbr title="Save Blog">
                            <ReactSaveIcon className='save-icon' />
                        </abbr>
                    </a>
                )
            }
        </div>
    )
};

export default SaveUnsaveBlog;