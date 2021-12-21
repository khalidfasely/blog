import React from "react";
import { render, fireEvent } from '@testing-library/react';
import { ModalDelete } from '../../components/ModalDelete';

let props;

beforeEach(() => {
    props = {
        rModalOpen: true,
        setRModalOpen: jest.fn(),
        deleteBlog: jest.fn()
    };
});

test('Should render ModalDelete component correctly', () => {
    const { asFragment } = render(<ModalDelete {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render/fire close button correctly', () => {
    const { getByTestId } = render(<ModalDelete {...props} />);
    const closeButtonEl = getByTestId('close_button');
    expect(closeButtonEl.textContent).toBe('X');

    expect(props.setRModalOpen).toHaveBeenCalledTimes(0);

    fireEvent.click(closeButtonEl);

    expect(props.setRModalOpen).toHaveBeenCalledTimes(1);
});

test('Should render/fire delete button correctly', () => {
    const { getByTestId } = render(<ModalDelete {...props} />);
    const deleteButtonEl = getByTestId('delete_button');
    expect(deleteButtonEl.textContent).toBe('Delete Blog');

    expect(props.deleteBlog).toHaveBeenCalledTimes(0);

    fireEvent.click(deleteButtonEl);

    expect(props.deleteBlog).toHaveBeenCalledTimes(1);
});