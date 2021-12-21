import React from "react";
import { render } from '@testing-library/react';
import { NewComment } from '../../components/NewComment';

let props;

beforeEach(() => {
    props = {
        uname: 'User',
        onFormSubmit: jest.fn(),
        onCommentChange: jest.fn(),
        newComment: 'New Comment'
    }
});

test('Should render NewComment component correctly', () => {
    const { asFragment, getByTestId } = render(<NewComment {...props} />);
    expect(asFragment()).toMatchSnapshot();

    const newCommentInputEl = getByTestId('new_comment_input');
    expect(newCommentInputEl.value).toBe(props.newComment);
});

test('Should render NewComment component correctly with no prop', () => {
    const { asFragment } = render(<NewComment />);
    expect(asFragment()).toMatchSnapshot();
});