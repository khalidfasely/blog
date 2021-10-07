import React from 'react';
import BlogItem from './BlogItem';

const BlogsList = ({ blogs }) => {
    return (
        <div>
            {
                blogs.map(blog => (
                  <BlogItem key={blog.id} blog={blog} />
                ))
            }
        </div>
    )
}

export default BlogsList;