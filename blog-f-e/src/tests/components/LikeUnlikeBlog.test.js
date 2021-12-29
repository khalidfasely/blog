import React from "react";
import { render } from '@testing-library/react';
import { LikeUnlikeBlog } from '../../components/LikeUnlikeBlog';

let props;

beforeEach(() => {
    props = {
        uname: 'Admin',
        blogsLiked: ['1', '5'],
        bid: '5',
        buttonDis: true,
        unlike_b: jest.fn(),
        like_b: jest.fn()
    }
});

test('Should render LikeUnlikeBlog component correctly without uname', () => {
    const { asFragment } = render(<LikeUnlikeBlog />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render LikeUnlikeBlog component correctly if bid in blogsLiked', () => {
    const { asFragment, getByTestId } = render(<LikeUnlikeBlog {...props} />);
    expect(asFragment()).toMatchSnapshot();

    const unlikeButtonEl = getByTestId('like_unlike_blog');
    expect(unlikeButtonEl.className).toBe('unlike-container');
});

test('Should render LikeUnlikeBlog component correctly if bid not in blogsLiked', () => {
    const { asFragment, getByTestId } = render(<LikeUnlikeBlog {...{...props, bid: '6'}} />);
    expect(asFragment()).toMatchSnapshot();

    const likeButtonEl = getByTestId('like_unlike_blog');
    expect(likeButtonEl.className).toBe('like-container');
});