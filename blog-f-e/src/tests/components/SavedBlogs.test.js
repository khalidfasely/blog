import React from "react";
import { render } from "@testing-library/react";
import { SavedBlogs } from "../../components/SavedBlogs";
import blogs from '../fixtures/blogs';
jest.mock('../../components/BlogItem', () => () => 'BlogItem');

test('Should render SavedBlogs correctly with props', () => {
    const { asFragment } = render(<SavedBlogs blogs={blogs} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render SavedBlogs correctly with no props', () => {
    const { asFragment } = render(<SavedBlogs />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should paragraph element be on the DOM', () => {
    const { getByTestId } = render(<SavedBlogs blogs={[]} />);
    const headerEl = getByTestId('header');
    expect(headerEl.textContent).toBe('saved blogs');

    const paragraphEl = getByTestId('empty-blogs-paragraph');
    expect(paragraphEl.textContent).toBe('-No Blogs Saved-');
});