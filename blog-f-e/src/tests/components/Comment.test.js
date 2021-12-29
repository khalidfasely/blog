import React from "react";
import { render } from "@testing-library/react";
import { Comment } from '../../components/Comment';
import { blog1 } from "../fixtures/blog";

let props;

beforeEach(() => {
    props = {
        blogId: 1,
        comment: blog1.comments[0],
        uname: 'User',
        commentsLiked: ['4', '9'],
        startLikeComment: jest.fn(),
        startUnlikeComment: jest.fn(),
        l_comment: jest.fn(),
        u_comment: jest.fn()
    }
});

test('Should render Comment component correctly', () => {
    const { asFragment } = render(<Comment comment={props.comment} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render Comment component correctly with props', () => {
    const { asFragment } = render(<Comment {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render like button', () => {
    const { getByTestId } = render(<Comment {...{...props, commentsLiked: []}} />);
    const likeUnlikeButtonEl = getByTestId('like_unlike_button');
    expect(likeUnlikeButtonEl.tagName).toBe('A');
});

test('Should render unlike button', () => {
    const { getByTestId } = render(<Comment {...props} />);
    const likeUnlikeButtonEl = getByTestId('like_unlike_button');
    expect(likeUnlikeButtonEl.tagName).toBe('A');
});