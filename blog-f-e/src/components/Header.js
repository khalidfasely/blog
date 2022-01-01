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
                <Link to='/' className='logo nav__link_a'>
                    <abbr title='Blog Home'>
                        <span data-testid='title_header'>Blog</span>
                    </abbr>
                </Link>
                <nav>
                    {uname ? 
                        <ul className='nav__links'>
                            <li>
                                <abbr title='Create New Blog'>
                                    <Link to='/new' className='header__link' className='nav__link_a'>New Blog</Link>
                                </abbr>
                            </li>
                            <li>
                                <abbr title='Your Profile'>
                                    <Link data-testid='profile_login_link' to={`/user/${uid}`} className='nav__link_a'>
                                        <img className='nav__links_icon' src={profileIcon} />
                                        {uname}
                                    </Link>
                                </abbr>
                            </li>
                            <li>
                                <abbr title='Logout'>
                                    <button onClick={logout} className='nav__link_b'>Logout</button>
                                </abbr>
                            </li>
                        </ul> :
                        <ul className='nav__links'>
                            <li>
                                <abbr title='Login'>
                                    <Link data-testid='profile_login_link' to='/login' className='nav__link_b'>Login</Link>
                                </abbr>
                            </li>
                            <li>
                                <abbr title='Create An Acount'>
                                    <Link to='/register' className='nav__link_a'>Sign In</Link>
                                </abbr>
                            </li>
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