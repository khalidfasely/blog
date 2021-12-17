import React from 'react';
import { render } from "@testing-library/react";
import { MarkdownBlog } from '../../components/MarkdownBlog';
import { blog1 as blog } from '../fixtures/blog';

test('Should render MarkdownBlog correctly with props', () => {
    const { asFragment } = render(<MarkdownBlog blogContent={blog.content} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render MarkdownBlog correctly with no props', () => {
    const { asFragment } = render(<MarkdownBlog />);
    expect(asFragment()).toMatchSnapshot();
});