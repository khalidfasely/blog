import React from 'react';
import BlogItem from './BlogItem';

const BlogsList = ({ blogs, searchFilter }) => {
    return (
        <div>
            {
                blogs.filter(blog => blog.title.toLowerCase().includes(searchFilter.toLowerCase())).map(blog => (
                  <BlogItem key={blog.id} blog={blog} />
                ))
            }
        </div>
    )
}

export default BlogsList;