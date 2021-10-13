import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from "react-markdown";

const BlogItem = ({ blog }) => (
    <div>
      <Link to={`/blog/${blog.id}`}>{blog.title}</Link> by <Link to={`/user/${blog.created_by.id}`}>{blog.created_by.username}</Link> -- {blog.created_at}
      <div>{blog.description}</div>
      <div>{blog.likes} -- {blog.dislikes}</div>
    </div>
)

export default BlogItem;

//<ReactMarkdown>{blog.content}</ReactMarkdown>