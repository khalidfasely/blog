import React from 'react';

class UserPage extends React.Component {
    componentDidMount(){
        fetch(`/data/user_page/${this.props.match.params.uid}`)
        .then(res => res.json())
        .then(result => console.log(result))
        .catch(er => console.log(er));
    }
    render(){
        return <div>User Page {this.props.match.params.uid}</div>
    }
};

export default UserPage;