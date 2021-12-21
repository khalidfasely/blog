import React from "react";
import { render } from '@testing-library/react';
import { BlogItem } from "../../components/BlogItem";
import { blog1 } from "../fixtures/blog";
jest.mock('../../components/BlogPage', () => () => 'BlogPage');

let props;

beforeEach(() => {
    props = {
        blog: blog1,
        uname: 'Anonymous',
        startDeleteBlog: jest.fn(),
        savedBlogs: [],
        unsaveBlog: jest.fn(),
        blogPageList: [],
        removeBlogFromBP: jest.fn(),
        profileList: [],
        removeBlogFromUP: jest.fn()
    }
});

test('Should render BlogItem component correctly with all props', () => {
    const { asFragment } = render(<BlogItem {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render BlogItem component correctly without uname', () => {
    const { asFragment } = render(<BlogItem {...{...props, uname: undefined}} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render X button correctly', () => {
    const { getByTestId } = render(<BlogItem {...props} />);

    const removeButtonEl = getByTestId('remove_button');
    expect(removeButtonEl.textContent).toBe('X');
});

test('Should render all elements correctly', () => {
    const { getByTestId } = render(<BlogItem {...{...props, uname: undefined}} />);

    const blogDescriptionEl = getByTestId('blog_description');
    expect(blogDescriptionEl.textContent).toBe(props.blog.description);

    const likesDislikesEl = getByTestId('likes_dislikes');
    expect(likesDislikesEl.textContent).toBe(`${props.blog.likes} -- ${props.blog.dislikes}`);

    const previewButtonEl = getByTestId('preview_button');
    expect(previewButtonEl.textContent).toBe('Preview');
});