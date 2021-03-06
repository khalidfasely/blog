import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRegister } from '../actions/auth';
import { history } from '../router/AppRouter';

export const Register = ({ startRegister }) => {
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
            setError('');
            startRegister({ username, email, password, confirmation }).then((result) => {
                if (result.message !== "Register") {
                    setError(result.message);
                } else {
                    
                    history.push('/');
                }
            });
        } else {
            setError('Make Sure You Fill All Fields AND The Passwords Match!');
        }
    }

    return (
        <div className='content-container'>
            <form className='register-form' data-testid='form' onSubmit={onFormSubmit}>
                {error && <p className='register-form__error' data-testid='error_message'>{error}</p>}
                <div className='register-form__lab-inp'>
                    <div>
                        <label htmlFor='username_new'>Username:</label>
                    </div>
                    <div>
                        <input
                          id='username_new'
                          data-testid='username'
                          name='username'
                          type='text'
                          autoFocus
                          placeholder='Username'
                          value={username}
                          maxLength={35}
                          onChange={onUsernameChange}
                        />
                    </div>
                </div>
                <div className='register-form__lab-inp'>
                    <div>
                        <label htmlFor='email_new'>Email:</label>
                    </div>
                    <div>
                        <input
                          id='email_new'
                          data-testid='email'
                          name='email'
                          type='email'
                          placeholder='Email'
                          value={email}
                          maxLength={70}
                          onChange={onEmailChange}
                        />
                    </div>
                </div>
                <div className='register-form__lab-inp'>
                    <div>
                        <label htmlFor='password_new'>Password:</label>
                    </div>
                    <div>
                        <input
                          id='password_new'
                          data-testid='password'
                          name='password'
                          type='password'
                          placeholder='Password'
                          value={password}
                          maxLength={120}
                          onChange={onPasswordChange}
                        />
                    </div>
                </div>
                <div className='register-form__lab-inp'>
                    <div>
                        <label htmlFor='confirmation_new'>Confirmation:</label>
                    </div>
                    <div>
                        <input
                          id='confirmation_new'
                          data-testid='confirmation'
                          name='confirmation'
                          type='password'
                          placeholder='Password (Again)'
                          value={confirmation}
                          maxLength={120}
                          onChange={onConfirmationChange}
                        />
                    </div>
                </div>
                <div>
                    <button data-testid='button'>Register</button>
                </div>
                <div className='register-form__link'>Already have an account? <Link to='/login'>Log In here.</Link></div>
            </form>
        </div>
    );
};

const mapDispacthToProps = (dispatch) => ({
    startRegister: ({ username, email, password, confirmation }) => dispatch(startRegister({ username, email, password, confirmation }))
});

export default connect(undefined, mapDispacthToProps)(Register);