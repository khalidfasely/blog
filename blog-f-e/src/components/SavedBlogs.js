import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSetSavedBlogs } from '../actions/savedBlogs';
import BlogsList from './BlogsList';

const SavedBlogs = ({ startSetSavedBlogs, blogs }) => {
    //const [ blogs, setBlogs ] = useState();
    useEffect(() => {
        //startSetSavedBlogs();
        document.title = `Saved Blogs`;
    }, [])
    return (
        <div>
            <p>saved blogs</p>
            {
                blogs && <div>{
                    blogs.length !== 0 ?
                    <BlogsList blogs={blogs} /> :
                    <h5>-No Blogs Saved-</h5>
                }</div>
            }
        </div>
    )
};

const mapStateToProps = (state) => ({
    blogs: state.savedBlogs.blogs
});

const mapDispatchToProps = (dispatch) => ({
    startSetSavedBlogs: () => dispatch(startSetSavedBlogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedBlogs);