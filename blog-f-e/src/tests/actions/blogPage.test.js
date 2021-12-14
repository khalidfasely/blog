import { addComment, editBlog, likeBlog, likeComment, removeBlogFromBP, setBlog, unlikeBlog, unlikeComment } from "../../actions/blogPage";
import blogs from "../fixtures/blogs";
import { blog1 as blog } from "../fixtures/blog";

test('Should set blog action object with provided data', () => {
    const action = setBlog({ blog: blogs[0], comments: blog.comments[1] });
    expect(action).toEqual({
        type: 'SET_BLOG',
        blog: {
            ...blogs[0],
            comments: blog.comments[1]
        }
    });
});

test('Should set blog action object without comments', () => {
    const action = setBlog({ blog: blogs[0] });
    expect(action).toEqual({
        type: 'SET_BLOG',
        blog: {
            ...blogs[0],
            comments: []
        }
    });
});

test('Should set add comment action object', () => {
    const bid = 2;
    const action = addComment(bid, blog.comments[0]);
    expect(action).toEqual({
        type: 'ADD_COMMENT',
        id: bid,
        comment: blog.comments[0]
    });
});

test('Should set like comment action object', () => {
    const cid = 5;
    const bid = 3;
    const action = likeComment(cid, bid);
    expect(action).toEqual({
        type: 'LIKE_COMMENT',
        cid,
        bid
    });
});

test('Should set unlike comment action object', () => {
    const cid = 5;
    const bid = 3;
    const action = unlikeComment(cid, bid);
    expect(action).toEqual({
        type: 'UNLIKE_COMMENT',
        cid,
        bid
    });
});

test('Should set like blog action object', () => {
    const bid = 2;
    const action = likeBlog(bid);
    expect(action).toEqual({
        type: 'LIKE_BLOG',
        bid
    });
});

test('Should set unlike blog action object', () => {
    const bid = 2;
    const action = unlikeBlog(bid);
    expect(action).toEqual({
        type: 'UNLIKE_BLOG',
        bid
    });
});

test('Should set remove blog from BP action object', () => {
    const bid = 2;
    const action = removeBlogFromBP(bid);
    expect(action).toEqual({
        type: 'REMOVE_BLOG_FROM_BP',
        bid
    });
});

test('Should set edit blog action object', () => {
    const bid = 1;
    const updates = { category: 'Web' };
    const action = editBlog(bid, updates);
    expect(action).toEqual({
        type: 'EDIT_BLOG',
        bid,
        updates
    });
});