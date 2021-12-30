import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { startAddComment, startLikeBlog, startSetBlog, startUnlikeBlog } from '../actions/blogPage';
import { Link } from 'react-router-dom';
import { l_blog, s_blog, u_blog, u_s_blog } from '../actions/auth';
import { startSaveBlog, startUnsaveBlog } from '../actions/savedBlogs';
import ModalEdit from './ModalEdit';
import previewContent from '../functions/previewContent';
import { history } from '../router/AppRouter';
import SocialShare from './SocialShare';
import MarkdownBlog from './MarkdownBlog';
import NewComment from './NewComment';
import CommentsList from './CommentsList';
import SaveUnsaveBlog from './SaveUnsaveBlog';
import LikeUnlikeBlog from './LikeUnlikeBlog';
import BlogPageItems from './BlogPageItems';
import { ReactComponent as ReactEditIcon } from '../images/edit-regular.svg';
import imageLoader from '../images/loader.gif';

export const BlogPage = (props) => {
    const [renderBlog, setRenderBlog] = useState(false);
    const [blog, setBlog] = useState(undefined);
    const [newComment, setNewComment] = useState('');
    const [ buttonDis, setButtonDis ] = useState(false);
    const [ sButtonDis, setSButtonDis ] = useState(false);
    const [eModalOpen, setEModalOpen] = useState(false);
    const [ previewBlog, setPreviewBlog ] = useState(undefined);
    const disableButton = () => {
        setButtonDis(true);
        setTimeout(() => {
            setButtonDis(false);
        }, 200);
    };
    const disableSButton = () => {
        setSButtonDis(true);
        setTimeout(() => {
            setSButtonDis(false);
        }, 200);
    };
    const blogDidAlreadyLoad = () => {
        let blogInList = undefined;
        props.blogList.map((blogItem) => {
            if(blogItem.id === parseInt(props.match.params.bid)){
                blogInList = blogItem;
            };
        });
        return blogInList;
    }
    useEffect(() => {
        const blog = blogDidAlreadyLoad();
        if (blog) {
            setBlog(blog);
            if(!props.isPreview){
                document.title = `${blog.title} (@${blog.created_by.username}) - Blog`;
            }
            setRenderBlog(true);
            setPreviewBlog(previewContent(blog.content.substring(0, 300)));
            // Render the blog content.. from Redux
            // Otherwise Fecth it from the backend
            // Store it on Redux
            // Then render the content from Redux
        } else {
            props.startSetBlog(parseInt(props.match.params.bid)).then((result) => {
                setBlog({
                    ...result.blog,
                    comments: result.comments
                });
                if(!props.isPreview){
                    document.title = `${result.blog.title} (@${result.blog.created_by.username}) - Blog`;
                }
                setRenderBlog(true);
                setPreviewBlog(previewContent(result.blog.content.substring(0, 300)));
            });
        }
    }, [])
    const onCommentChange = (e) => {
        const newComment = e.target.value;
        setNewComment(newComment);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (newComment.replace(/\s/g, '')) {    
            props.startAddComment(parseInt(props.match.params.bid), newComment).then((result) => {
                setNewComment('');
                if (!blog.comments.includes(result.comment)) {
                    setBlog({
                        ...blog,
                        comments: [
                            ...blog.comments,
                            result.comment
                        ]
                    });
                }                
            });
            //history.push('/');
            //history.push(`/blog/${blog.id}`);
            //});
//.then((result) => {
//                setBlog({
//                    ...blog,
//                    comments: [
//                        ...blog.comments,
//                        ...result.comment
//                    ]
//                })
//            })
        }
    }

    const like_b = () => {
        disableButton();
        props.startLikeBlog(parseInt(props.match.params.bid)).then(() => {
            props.l_blog(parseInt(props.match.params.bid));
            setBlog({
                ...blog,
                likes: blog.likes + 1
            });
        });
    };

    const unlike_b = () => {
        disableButton();
        props.startUnlikeBlog(parseInt(props.match.params.bid)).then(() => {
            props.u_blog(parseInt(props.match.params.bid));
            setBlog({
                ...blog,
                likes: blog.likes - 1
            });
        });
    };

    const save_b = () => {
        disableSButton();
        props.startSaveBlog(parseInt(props.match.params.bid)).then(() => {
            props.s_blog(parseInt(props.match.params.bid));
        });
    };

    const unsave_b = () => {
        disableSButton();
        props.startUnsaveBlog(parseInt(props.match.params.bid)).then(() => {
            props.u_s_blog(parseInt(props.match.params.bid));
        });
    };

    if(renderBlog) {
        if (blog.isDefault) {
            return <div className='blog-page__error-data'>This Blog Not Available Now. <Link to='/'>Back Home</Link></div>
        } else if (props.isPreview) {
            return (
                <div className='preview-page'>
                    <BlogPageItems
                        blog={{...blog, content: `${previewBlog}...`}}
                        isPreview={true}
                    />
                    <div className='preview-page__comments-count'>{blog.comments.length} Comment(s)</div>
                    <div className='preview-page__interactions'>
                        <LikeUnlikeBlog
                            uname={props.uname}
                            blogsLiked={props.blogsLiked}
                            bid={props.match.params.bid}
                            buttonDis={buttonDis}
                            unlike_b={unlike_b}
                            like_b={like_b}
                        />
                        <SaveUnsaveBlog
                            uname={props.uname}
                            blogsSaved={props.blogsSaved}
                            bid={props.match.params.bid}
                            sButtonDis={sButtonDis}
                            unsave_b={unsave_b}
                            save_b={save_b}
                        />
                    </div>
                </div>
            )
        }
        return (
            <div className='blog-page'>
                <div className='blog-page__interactions'>
                    <LikeUnlikeBlog
                        uname={props.uname}
                        blogsLiked={props.blogsLiked}
                        bid={props.match.params.bid}
                        buttonDis={buttonDis}
                        unlike_b={unlike_b}
                        like_b={like_b}
                    />
                    {
                        props.uname && (
                            props.uname === blog.created_by.username &&
                            <a onClick={() => setEModalOpen(true)}>
                                <abbr title='Edit Blog'>
                                    <ReactEditIcon className='edit-blog-icon' />
                                </abbr>
                            </a>
                        )
                    }
                    <ModalEdit eModalOpen={eModalOpen} blog={blog} setEModalOpen={setEModalOpen} />
                    <SaveUnsaveBlog
                        uname={props.uname}
                        blogsSaved={props.blogsSaved}
                        bid={props.match.params.bid}
                        sButtonDis={sButtonDis}
                        unsave_b={unsave_b}
                        save_b={save_b}
                    />
                </div>
                <BlogPageItems blog={blog} />
                <SocialShare shareUrl={history.location.pathname} />
                <div className='comments-section'>
                    <CommentsList
                        comments={blog.comments}
                        blogId={blog.id}
                    />
                    <NewComment
                        uname={props.uname}
                        onFormSubmit={onFormSubmit}
                        onCommentChange={onCommentChange}
                        newComment={newComment}
                    />
                </div>
            </div>
        )
    } else {
        return <div className='blog-page__error-server'><img className="loader__image" src={imageLoader} alt="Loading..." /></div>
    };
};

const mapStateToProps = (state) => ({
    blogList: state.blogPage,
    uname: state.auth.uname,
    blogsLiked: state.auth.blogsLiked,
    blogsSaved: state.auth.blogsSaved
});

const mapDispatchToProps = (dispatch) => ({
    startSetBlog: (id) => dispatch(startSetBlog(id)),
    startAddComment: (blog_id, comment) => dispatch(startAddComment({ blog_id, comment })),
    startLikeBlog: (id) => dispatch(startLikeBlog(id)),
    startUnlikeBlog: (id) => dispatch(startUnlikeBlog(id)),
    l_blog: (id) => dispatch(l_blog(id)),
    u_blog: (id) => dispatch(u_blog(id)),
    s_blog: (id) => dispatch(s_blog(id)),
    u_s_blog: (id) => dispatch(u_s_blog(id)),
    startSaveBlog: (id) => dispatch(startSaveBlog(id)),
    startUnsaveBlog: (id) => dispatch(startUnsaveBlog(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);