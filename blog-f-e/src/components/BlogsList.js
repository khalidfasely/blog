import React from 'react';
import BlogItem from './BlogItem';

export const BlogsList = ({ blogs = [], searchFilter }) => {
    return (
        <div className='blogs-container'>
          {
            blogs.length === 0 ? (
              <p>No blogs</p>
            ) : (
              searchFilter ?
              //To filter with title |AND| description
              //blogs.filter(blog => blog.title.toLowerCase().includes(searchFilter.toLowerCase()) || blog.description.toLowerCase().includes(searchFilter.toLowerCase())).map(blog => (
              blogs.filter(blog => blog.title.toLowerCase().includes(searchFilter.toLowerCase())).map(blog => (
                <BlogItem key={blog.id} blog={blog} />
              )) :
              blogs.map(blog => (
                <BlogItem key={blog.id} blog={blog} />
              ))
            )
          }
        </div>
    )
}

export default BlogsList;