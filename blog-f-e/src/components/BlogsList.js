import React from 'react';
import BlogItem from './BlogItem';

const BlogsList = ({ blogs, searchFilter }) => {
    return (
        <div>
            {
                searchFilter ?
                //To filter with title |AND| description
                //blogs.filter(blog => blog.title.toLowerCase().includes(searchFilter.toLowerCase()) || blog.description.toLowerCase().includes(searchFilter.toLowerCase())).map(blog => (
                blogs.filter(blog => blog.title.toLowerCase().includes(searchFilter.toLowerCase())).map(blog => (
                  <BlogItem key={blog.id} blog={blog} />
                )) :
                blogs.map(blog => (
                  <BlogItem key={blog.id} blog={blog} />
                ))
            }
        </div>
    )
}

export default BlogsList;