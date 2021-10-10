import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { startSetBlog } from '../actions/blogPage';

class BlogPage extends React.Component {
    state = {
        renderBlog: false,
        blog: undefined
    }
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
                this.setState({ blog: result.blog, renderBlog: true });
                console.log(result);
                //this.setState({ renderBlog: true });
            });
        }
    }
    render(){
        if(this.state.renderBlog) {
            return (
                <div>
                    <h1>{this.state.blog.title}</h1>
                    <p>{this.state.blog.created_at}</p>
                    <p>{this.state.blog.created_by}</p>
                    <p>{this.state.blog.category}</p>
                    <p>{this.state.blog.description}</p>
                    <ReactMarkdown>{this.state.blog.content}</ReactMarkdown>
                    <p>{this.state.blog.likes}</p>
                    <p>{this.state.blog.dislikes}</p>
                    
                </div>
            )
        } else {
            return <div>Blog Page {this.props.match.params.bid}</div>
        };
    };
};

const mapStateToProps = (state) => ({
    blogList: state.blogPage
});

const mapDispatchToProps = (dispatch) => ({
    startSetBlog: (id) => dispatch(startSetBlog(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);