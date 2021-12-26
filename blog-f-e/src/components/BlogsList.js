import React from 'react';
import BlogItem from './BlogItem';
import { Link } from 'react-router-dom';

export const BlogsList = ({ blogs = [], searchFilter }) => {
    return (
        <div className='blogs-container'>
          {
            blogs.length === 0 ? (
              <div className='empty-blogs-list'>No blogs - <Link to='/new'>Create One Here!</Link></div>
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