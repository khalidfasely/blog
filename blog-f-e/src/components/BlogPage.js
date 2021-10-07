import React from 'react';

class BlogPage extends React.Component {
    render(){
        return <div>Blog Page {this.props.match.params.bid}</div>
    }
};

export default BlogPage;