import { addBlog, deleteBlog, editBlogFromBP, setBlogs } from "../../actions/blogs";
import blogs from "../fixtures/blogs"

test('Should set blogs action object with provided data', () => {
    const action = setBlogs(blogs);
    expect(action).toEqual({
        type: 'SET_BLOGS',
        blogs
    });
});

test('Should set blogs action object without data', () => {
    const action = setBlogs();
    expect(action).toEqual({
        type: 'SET_BLOGS',
        blogs: []
    });
});

test('Should set add blog action object with provided data', () => {
    const action = addBlog(blogs[0]);
    expect(action).toEqual({
        type: 'ADD_BLOG',
        blog: blogs[0]
    });
});

test('Should set add blog action object with provided data', () => {
    const action = addBlog();
    expect(action).toEqual({
        type: 'ADD_BLOG',
        blog: {}
    });
});

test('Should set delete blog action object', () => {
    const bid = 3;
    const action = deleteBlog(bid);
    expect(action).toEqual({
        type: 'DELETE_BLOG',
        bid
    });
});

test('Should set edit blog from BP action object with provided updates', () => {
    const bid = 2;
    const updates = {category: 'Web'};
    const action = editBlogFromBP(bid, updates);
    expect(action).toEqual({
        type: 'EDIT_BLOG_FROM_BP',
        bid,
        updates
    });
});

test('Should set edit blog from BP action object without updates data', () => {
    const bid = 2;
    const action = editBlogFromBP(bid);
    expect(action).toEqual({
        type: 'EDIT_BLOG_FROM_BP',
        bid,
        updates: {}
    });
});