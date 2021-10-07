import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import BlogsList from "./BlogsList";


const Blogs = ({ blogs }) => {
  return (
    <div>
      <h1>Blogs Section</h1>
      <BlogsList blogs={blogs} />
      <Link to='/profile'>Profile</Link>
    </div>
  )
};

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs,
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