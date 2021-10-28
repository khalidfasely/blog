import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { startAddComment, startLikeBlog, startSetBlog, startUnlikeBlog } from '../actions/blogPage';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import { l_blog, u_blog } from '../actions/auth';

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
    //componentDidUpdate(){
    //    console.log(this.state.blog)
    //}
    componentWillMount(){
        //console.log(this.props.blogsLiked, this.props.match.params.bid, this.props.blogsLiked.includes(this.props.match.params.bid))
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
    componentDidUpdate(props, prevState){
        if (prevState.blog) {
            //if (prevState.blog !== this.state.blog) {
                console.log(prevState.blog, this.state.blog, prevState.blog === this.state.blog);
            //}
        }
        
        //if (prevState.blog !== undefined) {
        //    if (prevState.blog !== this.state.blog) {
        //        console.log("update");
        //    }
        //}
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

    like_b = () => {
        //fetch(`/data/like_blog/${this.props.match.params.bid}`)
        //.then(res => res.json())
        //.then(result => console.log(result))
        //.catch(er => console.log(er));
        this.props.startLikeBlog(parseInt(this.props.match.params.bid)).then(() => {
            this.props.l_blog(parseInt(this.props.match.params.bid));
        });
    };

    unlike_b = () => {
        this.props.startUnlikeBlog(parseInt(this.props.match.params.bid)).then(() => {
            this.props.u_blog(parseInt(this.props.match.params.bid));
        });
    };

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
                        {
                            this.props.blogsLiked.includes(this.props.match.params.bid) ?
                            <button onClick={this.unlike_b}>Unlike</button> :
                            <button onClick={this.like_b}>Like</button>
                            //<button onClick={this.unlike_b}>Unlike</button>
                        }
                    </div>
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
    uname: state.auth.uname,
    blogsLiked: state.auth.blogsLiked
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