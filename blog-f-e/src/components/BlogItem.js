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
import ModalPreview from './ModalPreview';

export const BlogItem = ({
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

  return (//<div data-testid='likes_dislikes' >{blog.likes} -- {blog.dislikes}</div>
    <div className='blog-item'>
      <div className='blog-item__top'>
        <Link className='blog-item__link' data-testid='blog_title_link' to={`/blog/${blog.id}`}>
          <h5>{blog.title.substring(0, 35)}...</h5>
          <div data-testid='blog_description'>
            {blog.description.substring(0, 75)}...
          </div>
        </Link>
      </div>
      <div className='blog-item__bottom'>
        <div className='blog-item__buttons'>
          <button className='blog-item__prebutton' data-testid='preview_button' onClick={() => setPModalOpen(true)}>
            <abbr className='none-decoration' title='Preview The Blog'>Preview</abbr>
          </button>
          {
            uname===blog.created_by.username &&
              <button
                className='blog-item__delbutton'
                data-testid='remove_button'
                onClick={() => setRModalOpen(true)}
              >
                <abbr className='none-decoration' title='Delete Blog'>Delete</abbr>
              </button>
          }
        </div>
        <div className='blog-item__usertime'>
          <Link className='blog-item__user' data-testid='blog_user_link' to={`/user/${blog.created_by.id}`}>
            <abbr className='none-decoration' title={blog.created_by.username}>
              {blog.created_by.username}
            </abbr>
          </Link>
          <span className='blog-item__between'>|</span>
          <span>{blog.created_at.substring(0, 11)}</span>
        </div>
      </div>
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

//<abbr className='none-decoration' title={blog.title.substring(0, 50)}>
//  <h5>{blog.title.substring(0, 35)}...</h5>
//</abbr>
//<div data-testid='blog_description'>
//  <abbr className='none-decoration' title={blog.description.substring(0, 120)}>
//    {blog.description.substring(0, 75)}...
//  </abbr>
//</div>

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