import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { startAddComment, startSetBlog } from '../actions/blogPage';
import Comment from './Comment';

const BlogPage = (props) => {
    const [renderBlog, setRenderBlog] = useState(false);
    const [blog, setBlog] = useState(undefined);
    const [newComment, setNewComment] = useState('');

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
        const id = parseInt(props.match.params.bid);
        if (newComment.replace(/\s/g, '')) {    
            props.startAddComment(id, newComment)//.then((result) => {

//            })
            setNewComment('');
        }
    }

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
                    <h5>Comments:</h5>
                    {
                        blog.comments.length !== 0 ?
                        blog.comments.map(comment => <Comment key={comment.id} comment={comment} />) :
                        <div>-NO COMMENTS-</div>
                    }
                </div>
                <div>
                    <h5>Add comments:</h5>
                    <form onSubmit={onFormSubmit}>
                        <textarea
                          placeholder='Comment'
                          onChange={onCommentChange}
                          value={newComment}
                        />
                        <button disabled={!newComment.replace(/\s/g, '')}>Add Comment</button>
                    </form>
                </div>
            </div>
        )
    } else {
        return <div>Blog Page {props.match.params.bid}</div>
    };
};

const mapStateToProps = (state) => ({
    blogList: state.blogPage
});

const mapDispatchToProps = (dispatch) => ({
    startSetBlog: (id) => dispatch(startSetBlog(id)),
    startAddComment: (blog_id, comment) => dispatch(startAddComment({ blog_id, comment }))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);