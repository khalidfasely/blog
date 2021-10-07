import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRegister } from '../actions/auth';
import { history } from '../router/AppRouter';

const Register = ({ startRegister }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [error, setError] = useState('');

    const onUsernameChange = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onPasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const onConfirmationChange = (e) => {
        const confirmation = e.target.value;
        setConfirmation(confirmation);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        const availableData = !!(username && email && password && confirmation && password === confirmation);
        
        if (availableData) {
            //console.log('available data!');
            startRegister({ username, email, password, confirmation }).then((result) => {
                if (result.message !== "Register") {
                    setError(result.message);
                } else {
                    setError('');
                    history.push('/');
                }
            });
        } else {
            setError('Make Sure You Fill All Fields AND The Passwords Match!');
        }
    }

    return (
        <div>
            {error && <div>{error}</div>}
            <form onSubmit={onFormSubmit}>
                <input
                  name='username'
                  type='text'
                  autoFocus
                  placeholder='Username'
                  value={username}
                  onChange={onUsernameChange}
                />
                <input
                  name='email'
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={onEmailChange}
                />
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={onPasswordChange}
                />
                <input
                  name='confirmation'
                  type='password'
                  placeholder='Password (Again)'
                  value={confirmation}
                  onChange={onConfirmationChange}
                />
                <button>Submit</button>
            </form>
            Already have an account? <Link to='/login'>Log In here.</Link>
        </div>
    );
};

const mapDispacthToProps = (dispatch) => ({
    startRegister: ({ username, email, password, confirmation }) => dispatch(startRegister({ username, email, password, confirmation }))
});

export default connect(undefined, mapDispacthToProps)(Register);