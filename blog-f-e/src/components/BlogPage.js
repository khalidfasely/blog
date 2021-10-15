import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { startAddComment, startSetBlog } from '../actions/blogPage';
import Comment from './Comment';
import { Link } from 'react-router-dom';

class BlogPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderBlog: false,
            blog: undefined,
            newComment: ''
        }
    }
    //state = {
    //    renderBlog: false,
    //    blog: undefined,
    //    newComment: ''
    //}
    blogDidAlreadyLoad = () => {
        let blogInList = undefined;
        this.props.blogList.map((blogItem) => {
            if(blogItem.id === parseInt(this.props.match.params.bid)){
                blogInList = blogItem;
            };
        });
        return blogInList;
    }
    componentWillMount(){
        const blog = this.blogDidAlreadyLoad();
        if (blog) {
            this.setState({ blog });
            this.setState({ renderBlog: true });
            // Render the blog content.. from Redux
            // Otherwise Fecth it from the backend
            // Store it on Redux
            // Then render the content from Redux
        } else {
            this.props.startSetBlog(parseInt(this.props.match.params.bid)).then((result) => {
                this.setState({ blog: {
                    ...result.blog,
                    comments: result.comments
                }, renderBlog: true });
                //this.setState({ renderBlog: true });
            });
        }
    }

    onCommentChange = (e) => {
        const newComment = e.target.value;
        this.setState({ newComment });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.newComment.replace(/\s/g, '')) {    
            this.props.startAddComment(parseInt(this.props.match.params.bid), this.state.newComment)//.then((result) => {

//            })
            this.setState({ newComment: '' });
        }
    }

    render(){
        if(this.state.renderBlog) {
            return (
                <div>
                    <h1>{this.state.blog.title}</h1>
                    <p>{this.state.blog.created_at}</p>
                    <p>{this.state.blog.created_by.username}</p>
                    <p>{this.state.blog.category}</p>
                    <p>{this.state.blog.description}</p>
                    <ReactMarkdown>{this.state.blog.content}</ReactMarkdown>
                    <p>{this.state.blog.likes}</p>
                    <p>{this.state.blog.dislikes}</p>
                    <div>
                        <h5>Comments:</h5>
                        {
                            this.state.blog.comments.length !== 0 ?
                            this.state.blog.comments.map(comment => <Comment key={comment.id} blogId={this.state.blog.id} comment={comment} />) :
                            <div>-NO COMMENTS-</div>
                        }
                    </div>
                    <div>
                        <h5>Add comments:</h5>
                        {
                            this.props.uname ?
                            <form onSubmit={this.onFormSubmit}>
                                <textarea
                                placeholder='Comment'
                                onChange={this.onCommentChange}
                                value={this.state.newComment}
                                />
                                <button disabled={!this.state.newComment.replace(/\s/g, '')}>Add Comment</button>
                            </form> :
                            <h5><Link to='/login'>Login</Link> or <Link to='/register'>Sign In</Link> to Add a Comment!</h5>
                        }
                    </div>
                </div>
            )
        } else {
            return <div>Blog Page {this.props.match.params.bid}</div>
        };
    };
};

const mapStateToProps = (state) => ({
    blogList: state.blogPage,
    uname: state.auth.uname
});

const mapDispatchToProps = (dispatch) => ({
    startSetBlog: (id) => dispatch(startSetBlog(id)),
    startAddComment: (blog_id, comment) => dispatch(startAddComment({ blog_id, comment }))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);