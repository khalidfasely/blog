import React from 'react';

class UserPage extends React.Component {
    render(){
        return <div>User Page {this.props.match.params.uid}</div>
    }
};

export default UserPage;