import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ModalEdit } from '../../components/ModalEdit';
import blogs from '../fixtures/blogs';
jest.mock('../../components/NewBlog', () => () => 'NewBlog');

let props;

beforeEach(() => {
    props = {
        eModalOpen: true,
        setEModalOpen: jest.fn(),
        blog: blogs[0]
    };
});

test('Should render ModalEdit component correctly', () => {
    const { asFragment } = render(<ModalEdit {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render/fire close button correctly', () => {
    const { getByTestId } = render(<ModalEdit {...props} />);
    const closeButtonEl = getByTestId('close_button');
    expect(closeButtonEl.textContent).toBe('X');

    expect(props.setEModalOpen).toHaveBeenCalledTimes(0);

    fireEvent.click(closeButtonEl);

    expect(props.setEModalOpen).toHaveBeenCalledTimes(1);
});