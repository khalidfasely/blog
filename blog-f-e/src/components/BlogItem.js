import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { startDeleteBlog } from '../actions/blogs';
import { unsaveBlog } from '../actions/savedBlogs';
import { removeBlogFromBP } from '../actions/blogPage';
import { removeBlogFromUP } from '../actions/userPage';
import ModalDelete from './ModalDelete';
import { history } from '../router/AppRouter';
import BlogPage from './BlogPage';
import ModalPreview from './ModalPreview';

const BlogItem = ({
    blog,
    uname,
    startDeleteBlog,
    savedBlogs,
    unsaveBlog,
    blogPageList,
    removeBlogFromBP,
    profileList,
    removeBlogFromUP
  }) => {
  const [rModalOpen, setRModalOpen] = useState(false);
  const [pModalOpen, setPModalOpen] = useState(false);

  const deleteBlog = () => {
    startDeleteBlog(blog.id)
      .then(() => {
        // Unsave The Blog After Delete It
        savedBlogs.map(blogS => {
          if(blogS.id === blog.id){
            unsaveBlog(blog.id);
          }
        });
      })
      .then(() => {
        //Delete The Blog From The BlogPage If It's There
        blogPageList.map(blogP => {
          if(blogP.id === blog.id){
            removeBlogFromBP(blog.id);
          }
        });
      })
      .then(() => {
        profileList.map(profileItem => {
          const profileUsername = profileItem.uid.username;
          if (profileUsername === uname) {
            removeBlogFromUP(uname, blog.id);
          }
        });
      });
    setRModalOpen(false);
  };

  return (
    <div>
      <Link to={`/blog/${blog.id}`}>{blog.title}</Link> by <Link to={`/user/${blog.created_by.id}`}>{blog.created_by.username}</Link> -- {blog.created_at}
      <div>{blog.description}</div>
      <div>{blog.likes} -- {blog.dislikes}</div>
      {
        uname===blog.created_by.username &&
        <div>
          <button onClick={() => setRModalOpen(true)}>X</button>
        </div>
      }
      <button onClick={() => setPModalOpen(true)}>Preview</button>
      <ModalPreview pModalOpen={pModalOpen} setPModalOpen={setPModalOpen} bid={blog.id} />
      <ModalDelete rModalOpen={rModalOpen} deleteBlog={deleteBlog} setRModalOpen={setRModalOpen} />
    </div>
  )
};//closeTimeoutMS={200}

//<Modal
//isOpen={eModalOpen}
//contentLabel="Edit Blog"
//closeTimeoutMS={100}
//>
//<button>Edit Blog</button>
//<NewBlog isEdit={true} blog={blog} />
//<button onClick={() => setEModalOpen(false)}>X</button>
//</Modal>

const mapStateToProps = (state) => ({
  uname: state.auth.uname,
  savedBlogs: state.savedBlogs.blogs,
  blogPageList: state.blogPage,
  profileList: state.userPage,
});

const mapDispatchToProps = (dispatch) => ({
  startDeleteBlog: (bid) => dispatch(startDeleteBlog(bid)),
  unsaveBlog: (bid) => dispatch(unsaveBlog(bid)),
  removeBlogFromBP: (bid) => dispatch(removeBlogFromBP(bid)),
  removeBlogFromUP: (uname, bid) => dispatch(removeBlogFromUP(uname, bid))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogItem);

//<ReactMarkdown>{blog.content}</ReactMarkdown>