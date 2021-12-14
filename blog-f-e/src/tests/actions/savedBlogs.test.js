import { editBlogFromSB, saveBlog, setSavedBlogs, unsaveBlog, unsetSavedBlogs } from "../../actions/savedBlogs";
import blogs from "../fixtures/blogs";

test('Should set saved blogs action object with provided data', () => {
    const action = setSavedBlogs(blogs);
    expect(action).toEqual({
        type: 'SET_SAVED_BLOGS',
        blogs
    });
});

test('Should set saved blogs action object without data', () => {
    const action = setSavedBlogs();
    expect(action).toEqual({
        type: 'SET_SAVED_BLOGS',
        blogs: []
    });
});

test('Should set unset saved blogs action object', () => {
    const action = unsetSavedBlogs();
    expect(action).toEqual({
        type: 'UNSET_SAVED_BLOGS'
    });
});

test('Should set save blog action object', () => {
    const action = saveBlog(blogs[2]);
    expect(action).toEqual({
        type: 'SAVE_BLOG',
        blog: blogs[2]
    });
});

test('Should set unsave blog action object', () => {
    const bid = 1;
    const action = unsaveBlog(bid);
    expect(action).toEqual({
        type: 'UNSAVE_BLOG',
        bid
    });
});

test('Should set edit blog from SB action object', () => {
    const bid = 2;
    const updates = { title: 'New title' };
    const action = editBlogFromSB(bid, updates);
    expect(action).toEqual({
        type: 'EDIT_BLOG_FROM_SB',
        bid,
        updates
    });
});