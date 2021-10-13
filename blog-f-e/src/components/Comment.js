import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

const Comment = ({ comment }) => (
    <div>
        <Link to={`/user/${comment.created_by.id}`}>{comment.created_by.username}</Link>
        <p>{comment.content}</p>
        <p>{comment.created_at}</p>
        <p>{comment.likes}</p>
    </div>
);

export default Comment;