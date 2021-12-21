import React from "react";
import { render } from '@testing-library/react';
import { blog1 } from '../fixtures/blog';
import { CommentsList } from '../../components/CommentsList';
jest.mock('../../components/Comment', () => () => 'Comment');

test('Should render CommentsList component correctly', () => {
    const { asFragment } = render(<CommentsList comments={blog1.comments} blogId={blog1.id} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render CommentsList component correctly with empty comments array', () => {
    const { asFragment } = render(<CommentsList comments={[]} blogId={blog1.id} />);
    expect(asFragment()).toMatchSnapshot();
});