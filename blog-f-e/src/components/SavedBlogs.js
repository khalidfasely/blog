import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSetSavedBlogs } from '../actions/savedBlogs';
import BlogsList from './BlogsList';

export const SavedBlogs = ({ startSetSavedBlogs, blogs }) => {
    //const [ blogs, setBlogs ] = useState();
    useEffect(() => {
        //startSetSavedBlogs();
        document.title = `Saved Blogs`;
    }, [])
    return (
        <div>
            <h3 data-testid='header'>saved blogs</h3>
            {
                blogs && <div>{
                    blogs.length !== 0 ?
                    <BlogsList blogs={blogs} /> :
                    <p className='empty-blogs-list' data-testid='empty-blogs-paragraph'>-No Blogs Saved-</p>
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