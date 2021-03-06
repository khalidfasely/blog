import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../actions/auth';
import { history } from '../router/AppRouter';

export const Login = ({ startLogin }) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const onUsernameChange = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onPasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        if (username && password) {
            setError('');
            startLogin({ username, password }).then((result) => {
                if (result.message !== "Login Successfully.") {
                    setError(result.message);
                } else {
                    setUsername('');
                    setPassword('');

                    history.push('/');
                };
            });
        } else {
            setError('Fill out all fields!');
        }
        
    }

    return (
        <div className='content-container'>
            <form className='login-form' data-testid='form' onSubmit={onFormSubmit}>
                {error && <p className='login-form__error' data-testid='error_message'>{error}</p>}
                <div>
                    <label htmlFor='username_login'>Username:</label>
                    <input
                      id='username_login'
                      data-testid='username_input'
                      name='username'
                      autoFocus
                      placeholder='Username'
                      type='text'
                      value={username}
                      onChange={onUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor='password_login'>Password:</label>
                    <input
                      id='password_login'
                      data-testid='password_input'
                      name='password'
                      placeholder='Password'
                      type='password'
                      value={password}
                      onChange={onPasswordChange}
                    />
                </div>
                <div>
                    <button data-testid='button'>Login</button>
                </div>
                <div className='login-form__link'>Have not an account? <Link to='/register'>Create one here.</Link></div>
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: ({ username, password }) => dispatch(startLogin({ username, password })),
});

export default connect(undefined, mapDispatchToProps)(Login);