import React from "react";
import { render } from '@testing-library/react';
import { SaveUnsaveBlog } from '../../components/SaveUnsaveBlog';

let props;

beforeEach(() => {
    props = {
        uname: 'Admin',
        blogsSaved: ['1', '5'],
        bid: '5',
        sButtonDis: true,
        unsave_b: jest.fn(),
        save_b: jest.fn()
    }
});

test('Should render SaveUnsaveBlog component correctly without uname', () => {
    const { asFragment } = render(<SaveUnsaveBlog />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render SaveUnsaveBlog component correctly if bid in blogsSaved', () => {
    const { asFragment, getByTestId } = render(<SaveUnsaveBlog {...props} />);
    expect(asFragment()).toMatchSnapshot();

    const unsaveButtonEl = getByTestId('save_unsave_blog');
    expect(unsaveButtonEl.className).toBe('unsave-container');
});

test('Should render SaveUnsaveBlog component correctly if bid not in blogsSaved', () => {
    const { asFragment, getByTestId } = render(<SaveUnsaveBlog {...{...props, bid: '6'}} />);
    expect(asFragment()).toMatchSnapshot();

    const saveButtonEl = getByTestId('save_unsave_blog');
    expect(saveButtonEl.className).toBe('save-container');
});