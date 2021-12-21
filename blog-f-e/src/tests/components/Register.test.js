import React from 'react';
import { Register } from '../../components/Register';
import { render, fireEvent } from '@testing-library/react';

let getByTestId;

beforeEach(() => {
   const component = render(<Register />);
   getByTestId = component.getByTestId;
});

test('Should render Register component correctly', () => {
    const { asFragment } = render(<Register />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render button with correct text', () => {
    const buttonEl = getByTestId('button');
    expect(buttonEl.textContent).toBe('Register');
});

test('Should change username input value', () => {
    const usernameInputEl = getByTestId('username');

    expect(usernameInputEl.value).toBe('');

    fireEvent.change(usernameInputEl, {
        target: {
            value: 'Username'
        }
    });

    expect(usernameInputEl.value).toBe('Username');
});

test('Should change email input value', () => {
    const emailInputEl = getByTestId('email');

    expect(emailInputEl.value).toBe('');

    fireEvent.change(emailInputEl, {
        target: {
            value: 'Email@test'
        }
    });

    expect(emailInputEl.value).toBe('Email@test');
});

test('Should change password input value', () => {
    const passwordInputEl = getByTestId('password');

    expect(passwordInputEl.value).toBe('');

    fireEvent.change(passwordInputEl, {
        target: {
            value: 'Password'
        }
    });

    expect(passwordInputEl.value).toBe('Password');
});

test('Should change confirmation input value', () => {
    const confirmationInputEl = getByTestId('confirmation');

    expect(confirmationInputEl.value).toBe('');

    fireEvent.change(confirmationInputEl, {
        target: {
            value: 'Confirmation'
        }
    });

    expect(confirmationInputEl.value).toBe('Confirmation');
});

test('Should not submit the form with empty inputs', () => {
    const formEl = getByTestId('form');

    fireEvent.submit(formEl);

    const errorEl = getByTestId('error_message');

    expect(errorEl.textContent).toBe('Make Sure You Fill All Fields AND The Passwords Match!');
});

test('Should not submit the form with one empty input', () => {
    const formEl = getByTestId('form');

    const usernameInputEl = getByTestId('username');
    const emailInputEl = getByTestId('email');
    const passwordInputEl = getByTestId('password');

    fireEvent.change(usernameInputEl, {
        target: {
            value: 'Username'
        }
    });

    fireEvent.change(emailInputEl, {
        target: {
            value: 'Email@test'
        }
    });

    fireEvent.change(passwordInputEl, {
        target: {
            value: 'Password'
        }
    });

    fireEvent.submit(formEl);

    const errorEl = getByTestId('error_message');

    expect(errorEl.textContent).toBe('Make Sure You Fill All Fields AND The Passwords Match!');
});

test('Should not submit the form if password and confirmation does not matchs', () => {
    const formEl = getByTestId('form');

    const usernameInputEl = getByTestId('username');
    const emailInputEl = getByTestId('email');
    const passwordInputEl = getByTestId('password');
    const confirmationInputEl = getByTestId('confirmation');

    fireEvent.change(usernameInputEl, {
        target: {
            value: 'Username'
        }
    });

    fireEvent.change(emailInputEl, {
        target: {
            value: 'Email@test'
        }
    });

    fireEvent.change(passwordInputEl, {
        target: {
            value: 'Password'
        }
    });

    fireEvent.change(confirmationInputEl, {
        target: {
            value: 'AnotherPassword'
        }
    });

    fireEvent.submit(formEl);

    const errorEl = getByTestId('error_message');

    expect(errorEl.textContent).toBe('Make Sure You Fill All Fields AND The Passwords Match!');
});
