import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../router/AppRouter';
import { startLogout } from '../actions/auth';
import { unsetSavedBlogs } from '../actions/savedBlogs';
import profileIcon from '../images/64572.png';

export const Header = ({ uname, uid, startLogout, unsetSavedBlogs }) => {
    const logout = () => {
        startLogout().then(() => {
            unsetSavedBlogs();
            history.push('/');
        });
    };

    return (
            <header>
                <Link to='/' className='logo nav__link_a'><span data-testid='title_header'>Blog</span></Link>
                <nav>
                    {uname ? 
                        <ul className='nav__links'>
                            <li><Link to='/new' className='header__link' className='nav__link_a'>New Blog</Link></li>
                            <li><Link data-testid='profile_login_link' to={`/user/${uid}`} className='nav__link_a'>
                                <img className='nav__links_icon' src={profileIcon} />
                                {uname}
                            </Link></li>
                            <li><button onClick={logout} className='nav__link_b'>Logout</button></li>
                        </ul> :
                        <ul className='nav__links'>
                            <li><Link data-testid='profile_login_link' to='/login' className='nav__link_b'>Login</Link></li>
                            <li><Link to='/register' className='nav__link_a'>Sign In</Link></li>
                        </ul>
                    }
                </nav>
            </header>
    )
};

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
    uid: state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    unsetSavedBlogs: () => dispatch(unsetSavedBlogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);