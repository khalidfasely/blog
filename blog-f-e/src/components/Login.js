import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../actions/auth';
import { history } from '../router/AppRouter';

const Login = ({ startLogin }) => {
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
            startLogin({ username, password }).then((result) => {
                if (result.message !== "Login Successfully.") {
                    setError(result.message);
                } else {
                    setUsername('');
                    setPassword('');
                    
                    setError('');

                    history.push('/');
                };
            });
        } else {
            setError('Fill out all fields!')
        }
        
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                {error && <div>{error}</div>}
                <input
                  name='username'
                  autoFocus
                  placeholder='Username'
                  type='text'
                  value={username}
                  onChange={onUsernameChange}
                />
                <input
                  name='password'
                  placeholder='Password'
                  type='password'
                  value={password}
                  onChange={onPasswordChange}
                />
                <button>Login</button>
            </form>
            Have not an account? <Link to='/register'>Create one here.</Link>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: ({ username, password }) => dispatch(startLogin({ username, password })),
});

export default connect(undefined, mapDispatchToProps)(Login);