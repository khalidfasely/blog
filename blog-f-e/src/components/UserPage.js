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
import ModalEditProfile from './ModalEditProfile';
import { ReactComponent as ReactEditProfileIcon } from '../images/edit-regular.svg';

export const UserPage = (props) => {
    const [renderUserPage, setRenderUserPage] = useState(false);
    const [userPage, setUserPage] = useState();
    const [ePrModalOpen, setEdPrModalOpen] = useState(false);
    
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

    const resetInfoProfile = (newInfo) => {
        setUserPage({...userPage, ...newInfo});
    }

    if(renderUserPage) {
        return (
            <div className='content-container'>
                { userPage &&
                    <div className='user-page'>
                        <div className='user-page__info-section'>
                            <div className='user-page__uname-edit'>
                                <div className='user-page__uname'>
                                    {userPage.uid.username}
                                    <div className='user-page__join-date' data-testid='join_date'>
                                        <i>joined on:</i> {userPage.uinfo.join_date}
                                    </div>
                                </div>
                                {
                                    userPage.uid.username === props.uname &&
                                    <div className='user-page__private'>
                                        <div className='user-page__saved-link'>
                                            <Link data-testid='save_blogs_link' to='/saves'>
                                                <abbr title='Saved Blogs'>
                                                    Saved
                                                </abbr>
                                            </Link>
                                        </div>
                                        <div className='user-page__edit-button-container'>
                                            <a data-testid='edit_profile_button' onClick={() => setEdPrModalOpen(true)}>
                                                <abbr title="Edit Profile">
                                                    <ReactEditProfileIcon className='edit-profile-icon' />
                                                </abbr>
                                            </a>
                                        </div>
                                    </div>
                                }
                                </div>
                                {userPage.bio && <div className='user-page__bio' data-testid='user_bio' ><i>bio:</i> {userPage.bio}</div>}
                        </div>
                        <ModalEditProfile ePrModalOpen={ePrModalOpen} setEdPrModalOpen={setEdPrModalOpen} bio={userPage.bio} resetInfoProfile={resetInfoProfile} />
                        <BlogsList blogs={userPage.blogs} />
                    </div>
                }
            </div>
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