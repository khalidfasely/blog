import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import ReactMarkdown from "react-markdown";
import { startDeleteBlog } from '../actions/blogs';

const BlogItem = ({ blog, uname, startDeleteBlog }) => {
  const [rModalOpen, setRModalOpen] = useState(false);
  const [eModalOpen, setEModalOpen] = useState(false);

  const deleteBlog = () => {
    startDeleteBlog(blog.id);
    setRModalOpen(false);
  }

  return (
    <div>
      <Link to={`/blog/${blog.id}`}>{blog.title}</Link> by <Link to={`/user/${blog.created_by.id}`}>{blog.created_by.username}</Link> -- {blog.created_at}
      <div>{blog.description}</div>
      <div>{blog.likes} -- {blog.dislikes}</div>
      {
        uname===blog.created_by.username &&
        <div>
          <button onClick={() => setRModalOpen(true)}>X</button>
          <button onClick={() => setEModalOpen(true)}>Edit</button>
        </div>
      }
      <Modal
        isOpen={rModalOpen}
        contentLabel="Delete Blog"
        closeTimeoutMS={100}
      >
        <h5>If you delete this blog there is no way to return it.</h5>
        <button onClick={deleteBlog}>Delete Blog</button>
        <button onClick={() => setRModalOpen(false)}>X</button>
      </Modal>
    </div>
  )
};//closeTimeoutMS={200}

const mapStateToProps = (state) => ({
  uname: state.auth.uname
});

const mapDispatchToProps = (dispatch) => ({
  startDeleteBlog: (bid) => dispatch(startDeleteBlog(bid))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogItem);

//<ReactMarkdown>{blog.content}</ReactMarkdown>