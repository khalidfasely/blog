import React from "react";
import { render, fireEvent, getAllByAltText } from '@testing-library/react';
import { ModalEditProfile } from '../../components/ModalEditProfile';

let props;

beforeEach(() => {
    props = {
        ePrModalOpen: true,
        setEdPrModalOpen: jest.fn(),
        bio: '',
        resetInfoProfile: jest.fn(),
        uname: 'User',
        startEditProfile: jest.fn()
    }
});


test('Should render ModalEditProfile component correctly', () => {
    const { asFragment } = render(<ModalEditProfile {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render/fire close button correctly', () => {
    const { getByTestId } = render(<ModalEditProfile {...props} />);
    const closeButtonEl = getByTestId('close_button');

    expect(closeButtonEl.textContent).toBe('X');

    expect(props.setEdPrModalOpen).toHaveBeenCalledTimes(0);

    fireEvent.click(closeButtonEl);

    expect(props.setEdPrModalOpen).toHaveBeenCalledTimes(1);
});

test('Should change bio input value', () => {
    const { getByTestId } = render(<ModalEditProfile {...props} />);
    const bioInputEl = getByTestId('bio_input');

    expect(bioInputEl.value).toBe('');

    fireEvent.change(bioInputEl, {
        target: {
            value: 'This is my profile!'
        }
    });

    expect(bioInputEl.value).toBe('This is my profile!');

    fireEvent.change(bioInputEl, {
        target: {
            value: 'Anonymous.'
        }
    });

    expect(bioInputEl.value).toBe('Anonymous.');
});

test('Should render save button correctly', () => {
    const { getByTestId } = render(<ModalEditProfile {...props} />);
    const saveButtonEl = getByTestId('save_button');

    expect(saveButtonEl.textContent).toBe('Save New Infos');
});

test('Should fire submit form correctly', () => {
    const { getByTestId } = render(<ModalEditProfile {...props} />);
    const formEl = getByTestId('form');

    expect(props.startEditProfile).toHaveBeenCalledTimes(0);
    expect(props.resetInfoProfile).toHaveBeenCalledTimes(0);
    expect(props.setEdPrModalOpen).toHaveBeenCalledTimes(0);

    fireEvent.submit(formEl);

    expect(props.startEditProfile).toHaveBeenCalledTimes(1);
    expect(props.resetInfoProfile).toHaveBeenCalledTimes(1);
    expect(props.setEdPrModalOpen).toHaveBeenCalledTimes(1);
});