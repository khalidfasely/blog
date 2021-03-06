import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import BlogsList from "./BlogsList";
import SearchBlog from "./SearchBlog";


export const Blogs = ({ blogs, searchFilter }) => {
  
  useEffect(() => {
    document.title = `Blog`;
  }, [])

  return (//<h1 data-testid='header'>Blogs Section</h1>
    <div>
      <SearchBlog />
      <div className='content-container'>
        <BlogsList blogs={blogs} searchFilter={searchFilter} />
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs,
  searchFilter: state.filterBlogs.searchValue,
});

export default connect(mapStateToProps)(Blogs);



//blogs.map(blog => (
//  <div>
//    <h1>{blog.id}</h1>
//    <div>{blog.title}</div> by {blog.created_by} -- {blog.created_at}
//    <div>{blog.description}</div>
//    <div>{blog.content}</div>
//    <div>{blog.likes}</div>
//    <div>{blog.dislikes}</div>
//  </div>
//))
//}