import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { blog1 } from '../fixtures/blog';
import { BlogPage } from '../../components/BlogPage';
jest.mock('../../components/NewBlog', () => () => <div>NewBlog</div>);
jest.mock('../../components/Comment', () => () => <div>Comment</div>);
jest.mock('../../components/BlogPageItems', () => () => <div>BlogPageItems</div>);
jest.mock('../../components/LikeUnlikeBlog', () => () => <div>LikeUnlikeBlog</div>);
jest.mock('../../components/SaveUnsaveBlog', () => () => <div>SaveUnsaveBlog</div>);
jest.mock('../../components/SocialShare', () => () => <div>SocialShare</div>);
jest.mock('../../components/CommentsList', () => () => <div>CommentsList</div>);
//jest.mock('../../components/NewComment', () => () => <div>NewComment</div>);

let props;

beforeEach(() => {
    props = {
        blogList: [blog1],
        match: {
            params: { bid: 2 }
        },
        isPreview: false,
        uname: 'Anonymous',
        startAddComment: jest.fn(),
        blogsLiked: ['1', '5'],
        blogsSaved: ['5']
    }
});

test('Should render BlogPage component correctly with props', () => {//
    const { asFragment } = render(<BlogPage {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render BlogPage component correctly with isPreview', () => {
    const { asFragment } = render(<BlogPage {...{...props, isPreview: true}} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render BlogPage component correctly with uname!==blogPage(created_by)', () => {//
    const { asFragment } = render(<BlogPage {...{...props, uname: 'Admin'}} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render BlogPage component correctly with undefined uname', () => {
    const { asFragment } = render(<BlogPage {...{...props, uname: undefined}} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should chenge newComment input value correctly with all props', () => {
    const { getByTestId } = render(<BlogPage {...props} />);
    const newCommentInputEl = getByTestId('new_comment_input');

    expect(newCommentInputEl.value).toBe('');

    fireEvent.change(newCommentInputEl, {
        target: {
            value: 'This blog is useful'
        }
    });

    expect(newCommentInputEl.value).toBe('This blog is useful');
});

test('Should chenge newComment input value correctly with uname!==blogPage(created_by)', () => {
    const { getByTestId } = render(<BlogPage {...{...props, uname: 'Admin'}} />);
    const newCommentInputEl = getByTestId('new_comment_input');

    expect(newCommentInputEl.value).toBe('');

    fireEvent.change(newCommentInputEl, {
        target: {
            value: 'Yes!'
        }
    });

    expect(newCommentInputEl.value).toBe('Yes!');
});

test('Should fire onFormSubmit with new comment correctly', () => {
    const { getByTestId } = render(<BlogPage {...props} />);
    const newCommentInputEl = getByTestId('new_comment_input');
    const formEl = getByTestId('new_comment_form');

    fireEvent.submit(formEl);

    expect(props.startAddComment).toHaveBeenCalledTimes(0);

    fireEvent.change(newCommentInputEl, {
        target: {
            value: 'This blog help me.'
        }
    });

    expect(newCommentInputEl.value).toBe('This blog help me.');

    fireEvent.submit(formEl);

    //Make sure the textarea have been cleared after submit the form
    expect(newCommentInputEl.value).toBe('');

    expect(props.startAddComment).toHaveBeenCalledTimes(1);
});