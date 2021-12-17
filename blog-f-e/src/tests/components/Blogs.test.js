import React from 'react';
import { render } from "@testing-library/react";
import blogs from '../fixtures/blogs';
import { Blogs } from '../../components/Blogs';
jest.mock('../../components/SearchBlog', () => () => 'SearchBlog');
jest.mock('../../components/BlogItem', () => () => 'BlogItem');

test('Should render Blogs correcly with props', () => {
    const { asFragment  } = render(<Blogs blogs={blogs} searchFilter={'title2'} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render Blogs title correcly', () => {
    const { getByTestId } = render(<Blogs blogs={blogs} searchFilter={'title2'} />);
    const message = getByTestId("header");
    expect(message.textContent).toBe('Blogs Section');
});

test('Should render Blogs correcly with no props', () => {
    const { asFragment } = render(<Blogs />);
    expect(asFragment()).toMatchSnapshot();
});