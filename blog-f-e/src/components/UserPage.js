import React, { useEffect, useState } from 'react';
import BlogsList from './BlogsList';

const UserPage = (props) => {
    const [blogs, setBlogs] = useState();
    const [bio, setBio] = useState();
    useEffect(() => {
        fetch(`/data/user_page/${props.match.params.uid}`)
        .then(res => res.json())
        .then(result => {
            console.log(result)
            setBlogs(result.blogs);
            setBio(result.bio);
        })
        .catch(er => console.log(er));
    }, []);

    return (
        <div>
            <div>User Page {props.match.params.uid}</div>
            <h4>{bio}</h4>
            {
                blogs && <div>{
                    blogs.length !== 0 ?
                    <BlogsList blogs={blogs} /> :
                    <h5>-No Blogs In This Profile-</h5>
                }</div>
            }
        </div>
    )
};

export default UserPage;

//import React from 'react';
//
//class UserPage extends React.Component {
//    componentDidMount(){
//        fetch(`/data/user_page/${this.props.match.params.uid}`)
//        .then(res => res.json())
//        .then(result => {
//            console.log(result)
//        })
//        .catch(er => console.log(er));
//    }
//    render(){
//        return <div>User Page {this.props.match.params.uid}</div>
//    }
//};
//
//export default UserPage;