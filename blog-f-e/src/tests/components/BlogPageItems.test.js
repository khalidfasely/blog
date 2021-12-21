import React from "react";
import { render } from '@testing-library/react';
import { blog1 } from '../fixtures/blog';
import { BlogPageItems } from '../../components/BlogPageItems';

test('Should render BlogPageItems component correclty with no prop', () => {
    const { asFragment } = render(<BlogPageItems />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render BlogPageItems component correclty with blog prop', () => {
    const { asFragment, getByTestId } = render(<BlogPageItems blog={blog1} />);
    expect(asFragment()).toMatchSnapshot();

    const titleEl = getByTestId('title_item');
    expect(titleEl.textContent).toBe(blog1.title);

    const timeeEl = getByTestId('time_item');
    expect(timeeEl.textContent).toBe(blog1.created_at);

    const userEl = getByTestId('user_item');
    expect(userEl.textContent).toBe(blog1.created_by.username);

    const categoryEl = getByTestId('category_item');
    expect(categoryEl.textContent).toBe(blog1.category);

    const descriptionEl = getByTestId('description_item');
    expect(descriptionEl.textContent).toBe(blog1.description);

    const likesEl = getByTestId('likes_item');
    expect(likesEl.textContent).toBe(`${blog1.likes}`);

    const dislikesEl = getByTestId('dislikes_item');
    expect(dislikesEl.textContent).toBe(`${blog1.dislikes}`);
});

test('Should render BlogPageItems component with all props', () => {
    const { asFragment } = render(<BlogPageItems blog={blog1} isPreview={true} />);
    expect(asFragment()).toMatchSnapshot();
});