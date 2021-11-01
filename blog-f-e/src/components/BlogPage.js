import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { startAddComment, startLikeBlog, startSetBlog, startUnlikeBlog } from '../actions/blogPage';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import { l_blog, u_blog } from '../actions/auth';

const BlogPage = (props) => {
    const [renderBlog, setRenderBlog] = useState(false);
    const [blog, setBlog] = useState(undefined);
    const [newComment, setNewComment] = useState('');
    const [ buttonDis, setButtonDis ] = useState(false);
    const disableButton = () => {
        setButtonDis(true);
        setTimeout(() => {
            setButtonDis(false);
        }, 200);
    };
    //state = {
    //    renderBlog: false,
    //    blog: undefined,
    //    newComment: ''
    //}
    const blogDidAlreadyLoad = () => {
        let blogInList = undefined;
        props.blogList.map((blogItem) => {
            if(blogItem.id === parseInt(props.match.params.bid)){
                blogInList = blogItem;
            };
        });
        return blogInList;
    }
    //componentDidUpdate(){
    //    console.log(this.state.blog)
    //}
    useEffect(() => {
        //console.log(this.props.blogsLiked, this.props.match.params.bid, this.props.blogsLiked.includes(this.props.match.params.bid))
        const blog = blogDidAlreadyLoad();
        if (blog) {
            setBlog(blog);
            setRenderBlog(true);
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
                setRenderBlog(true);
                //this.setState({ renderBlog: true });
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
            props.startAddComment(parseInt(props.match.params.bid), newComment)//.then((result) => {

//            })
            setNewComment('');
        }
    }

    const like_b = () => {
        //fetch(`/data/like_blog/${this.props.match.params.bid}`)
        //.then(res => res.json())
        //.then(result => console.log(result))
        //.catch(er => console.log(er));
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

    if(renderBlog) {
        return (
            <div>
                <h1>{blog.title}</h1>
                <p>{blog.created_at}</p>
                <p>{blog.created_by.username}</p>
                <p>{blog.category}</p>
                <p>{blog.description}</p>
                <ReactMarkdown>{blog.content}</ReactMarkdown>
                <p>{blog.likes}</p>
                <p>{blog.dislikes}</p>
                <div>
                    {
                        props.uname && (
                            props.blogsLiked.includes(props.match.params.bid) ?
                            <button disabled={buttonDis} onClick={unlike_b}>Unlike</button> :
                            <button disabled={buttonDis} onClick={like_b}>Like</button>
                        )
                        //<button onClick={this.unlike_b}>Unlike</button>
                    }
                </div>
                <div>
                    {
                        props.uname && (
                            props.blogsSaved.includes(props.match.params.bid) ?
                            <button disabled={buttonDis}>Unsave</button> :
                            <button disabled={buttonDis}>Save</button>
                        )
                    }
                </div>
                <div>
                    <h5>Comments:</h5>
                    {
                        blog.comments.length !== 0 ?
                        blog.comments.map(comment => <Comment key={comment.id} blogId={blog.id} comment={comment} />) :
                        <div>-NO COMMENTS-</div>
                    }
                </div>
                <div>
                    <h5>Add comments:</h5>
                    {
                        props.uname ?
                        <form onSubmit={onFormSubmit}>
                            <textarea
                            placeholder='Comment'
                            onChange={onCommentChange}
                            value={newComment}
                            />
                            <button disabled={!newComment.replace(/\s/g, '')}>Add Comment</button>
                        </form> :
                        <h5><Link to='/login'>Login</Link> or <Link to='/register'>Sign In</Link> to Add a Comment!</h5>
                    }
                </div>
            </div>
        )
    } else {
        return <div>Blog Page {props.match.params.bid}</div>
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
    u_blog: (id) => dispatch(u_blog(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);

//import React, { useEffect, useState } from 'react';
//import { connect } from 'react-redux';
//import ReactMarkdown from 'react-markdown';
//import { startAddComment, startSetBlog } from '../actions/blogPage';
//import Comment from './Comment';
//
//const BlogPage = (props) => {
//    const [renderBlog, setRenderBlog] = useState(false);
//    const [blog, setBlog] = useState(undefined);
//    const [newComment, setNewComment] = useState('');
//
//    const blogDidAlreadyLoad = () => {
//        let blogInList = undefined;
//        props.blogList.map((blogItem) => {
//            if(blogItem.id === parseInt(props.match.params.bid)){
//                blogInList = blogItem;
//            };
//        });
//        return blogInList;
//    }
//    useEffect(() => {
//        const blog = blogDidAlreadyLoad();
//        if (blog) {
//            setBlog(blog);
//            setRenderBlog(true);
//            // Render the blog content.. from Redux
//            // Otherwise Fecth it from the backend
//            // Store it on Redux
//            // Then render the content from Redux
//        } else {
//            props.startSetBlog(parseInt(props.match.params.bid)).then((result) => {
//                setBlog({
//                    ...result.blog,
//                    comments: result.comments
//                });
//                setRenderBlog(true);
//                //this.setState({ renderBlog: true });
//            });
//        }
//    }, [])
//
//    const onCommentChange = (e) => {
//        const newComment = e.target.value;
//        setNewComment(newComment);
//    }
//
//    const onFormSubmit = (e) => {
//        e.preventDefault();
//        const id = parseInt(props.match.params.bid);
//        if (newComment.replace(/\s/g, '')) {    
//            props.startAddComment(id, newComment)//.then((result) => {
//
////            })
//            setNewComment('');
//        }
//    }
//
//    if(renderBlog) {
//        return (
//            <div>
//                <h1>{blog.title}</h1>
//                <p>{blog.created_at}</p>
//                <p>{blog.created_by.username}</p>
//                <p>{blog.category}</p>
//                <p>{blog.description}</p>
//                <ReactMarkdown>{blog.content}</ReactMarkdown>
//                <p>{blog.likes}</p>
//                <p>{blog.dislikes}</p>
//                <div>
//                    <h5>Comments:</h5>
//                    {
//                        blog.comments.length !== 0 ?
//                        blog.comments.map(comment => <Comment key={comment.id} comment={comment} />) :
//                        <div>-NO COMMENTS-</div>
//                    }
//                </div>
//                <div>
//                    <h5>Add comments:</h5>
//                    <form onSubmit={onFormSubmit}>
//                        <textarea
//                          placeholder='Comment'
//                          onChange={onCommentChange}
//                          value={newComment}
//                        />
//                        <button disabled={!newComment.replace(/\s/g, '')}>Add Comment</button>
//                    </form>
//                </div>
//            </div>
//        )
//    } else {
//        return <div>Blog Page {props.match.params.bid}</div>
//    };
//};
//
//const mapStateToProps = (state) => ({
//    blogList: state.blogPage
//});
//
//const mapDispatchToProps = (dispatch) => ({
//    startSetBlog: (id) => dispatch(startSetBlog(id)),
//    startAddComment: (blog_id, comment) => dispatch(startAddComment({ blog_id, comment }))
//});
//
//export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);