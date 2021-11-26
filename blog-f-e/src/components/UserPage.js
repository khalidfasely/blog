import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { startAddComment, startLikeBlog, startSetBlog, startUnlikeBlog } from '../actions/blogPage';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import { l_blog, s_blog, u_blog, u_s_blog } from '../actions/auth';
import { startSaveBlog, startUnsaveBlog } from '../actions/savedBlogs';
import { startSetUserPage } from '../actions/userPage';
import BlogsList from './BlogsList';

const UserPage = (props) => {
    const [renderUserPage, setRenderUserPage] = useState(false);
    const [userPage, setUserPage] = useState();
    
    const blogDidAlreadyLoad = () => {
        let profileInList = undefined;
        let num = 0;
        props.profileList.map((profileItem) => {    
            //console.log(parseInt(profileItem.uid) === parseInt(props.match.params.uid));
            //console.log(profileItem.uid, parseInt(props.match.params.uid))
            if(parseInt(profileItem.uid.id) === parseInt(props.match.params.uid)){
                profileInList = profileItem;
            };
            num++;
        });
        return profileInList;
    }
    //componentDidUpdate(){
    //    console.log(this.state.blog)
    //}
    useEffect(() => {
        //console.log(this.props.blogsLiked, this.props.match.params.bid, this.props.blogsLiked.includes(this.props.match.params.bid))
        const userPage = blogDidAlreadyLoad();
        if (userPage) {
            setUserPage(userPage);
            document.title = `${userPage.uid.username} - Blog`;
            setRenderUserPage(true);
            // Render the blog content.. from Redux
            // Otherwise Fecth it from the backend
            // Store it on Redux
            // Then render the content from Redux
        } else {
            props.startSetUserPage(parseInt(props.match.params.uid)).then((result) => {
                setUserPage({
                    uid: result.uid,
                    uinfo: result.uinfo,
                    bio: result.bio,
                    blogs: result.blogs
                });
                document.title = `${result.uid.username} - Blog`;
                setRenderUserPage(true);
                //this.setState({ renderBlog: true });
            });
        }
    }, [])

    if(renderUserPage) {
        return (
            <div>{ userPage &&
                <div>
                    <div>{`joined on: ${userPage.uinfo.join_date}`}</div>
                    {userPage.bio && <div>bio: {userPage.bio}</div>}
                    <BlogsList blogs={userPage.blogs} />
                </div>
            }</div>
        )
    } else {
        return <div>User Page {props.match.params.uid}</div>
    };
};//<div>{`joined on: ${userPage.uinfo.join_date} - last login on: ${userPage.uinfo.last_login}`}</div>

const mapStateToProps = (state) => ({
    profileList: state.userPage,
    uname: state.auth.uname,
});

const mapDispatchToProps = (dispatch) => ({
    startSetUserPage: (id) => dispatch(startSetUserPage(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);




//import React, { useEffect, useState } from 'react';
//import BlogsList from './BlogsList';
//
//const UserPage = (props) => {
//    const [blogs, setBlogs] = useState();
//    const [bio, setBio] = useState();
//    useEffect(() => {
//        fetch(`/data/user_page/${props.match.params.uid}`)
//        .then(res => res.json())
//        .then(result => {
//            console.log(result)
//            setBlogs(result.blogs);
//            setBio(result.bio);
//        })
//        .catch(er => console.log(er));
//    }, []);
//
//    return (
//        <div>
//            <div>User Page {props.match.params.uid}</div>
//            <h4>{bio}</h4>
//            {
//                blogs && <div>{
//                    blogs.length !== 0 ?
//                    <BlogsList blogs={blogs} /> :
//                    <h5>-No Blogs In This Profile-</h5>
//                }</div>
//            }
//        </div>
//    )
//};
//
//export default UserPage;