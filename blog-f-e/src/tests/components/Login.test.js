import React from "react";
import { Login } from "../../components/Login";
import { render, fireEvent } from "@testing-library/react";

let getByTestId;

beforeEach(() => {
   const component = render(<Login />);
   getByTestId = component.getByTestId;
});

test('Should render Login component correctly', () => {
    const { asFragment } = render(<Login />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render Login button correctly', () => {
    const buttonEl = getByTestId("button");
    expect(buttonEl.textContent).toBe('Login');
});

test('Should change username input value', () => {
    const usernameInputEl = getByTestId("username_input");

    expect(usernameInputEl.value).toBe('');

    fireEvent.change(usernameInputEl, {
        target: {
            value: 'Username'
        }
    });

    expect(usernameInputEl.value).toBe('Username');
});

test('Should change password input value', () => {
    const passwordInputEl = getByTestId("password_input");

    expect(passwordInputEl.value).toBe('');

    fireEvent.change(passwordInputEl, {
        target: {
            value: 'Password'
        }
    });

    expect(passwordInputEl.value).toBe('Password');
});

test('Should submit form with empty inputs', () => {
    const formEl = getByTestId("form");

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    const errorEl = getByTestId("error_message");
    expect(errorEl.textContent).toBe('Fill out all fields!');
});

//test('Should change username/password inputs value and submit the form work correctly', () => {
//    //const startLogin = async (message='Login Successfully.') => jest.fn({message});
//    const startLogin = jest.fn();
//    const history = { push: jest.fn() };
//    const { getByTestId, queryByTestId } = render(<Login startLogin={async () => startLogin} history={history} />);
//    const usernameInputEl = getByTestId("username_input");
//    const passwordInputEl = getByTestId("password_input");
//    const formEl = getByTestId("form");
//
//    //const startLogin = jest.fn();
//    //const history = { push: jest.fn() };
//
//    fireEvent.submit(formEl, {
//        preventDefault: () => {}
//    });
//
//    let errorEl = queryByTestId("error_message");
//
//    expect(errorEl.textContent).toBe('Fill out all fields!');
//
//    fireEvent.change(usernameInputEl, {
//        target: {
//            value: 'Username'
//        }
//    });
//
//    fireEvent.change(passwordInputEl, {
//        target: {
//            value: 'Password'
//        }
//    });
//
//    fireEvent.submit(formEl, {
//        preventDefault: () => {}
//    });
//
//    errorEl = queryByTestId("error_message");
//
//    expect(errorEl.textContent).toBe(null);
//});