import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../router/AppRouter';
import { startLogout } from '../actions/auth';
import { unsetSavedBlogs } from '../actions/savedBlogs';

const Header = ({ uname, startLogout, unsetSavedBlogs }) => {
    const logout = () => {
        startLogout().then(() => {
            unsetSavedBlogs();
            history.push('/');
        });
    };

    return (
        <div>
            <Link to='/'><h1>Blog</h1></Link>
            {uname ? 
                <p>
                    <Link to='/profile'>Profile {uname}</Link>
                    <Link to='/new'>New Blog</Link>
                    <button onClick={logout}>Logout</button>
                </p> :
                <p>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Sign In</Link>
                </p>
            }
        </div>
    )
};

const mapStateToProps = (state) => ({
    uname: state.auth.uname
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    unsetSavedBlogs: () => dispatch(unsetSavedBlogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);