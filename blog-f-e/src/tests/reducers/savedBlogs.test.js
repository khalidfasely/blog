import savedBlogsReducer from "../../reducers/savedBlogs";
import blogs from "../fixtures/blogs";

test('Should savedBlogs with default state', () => {
    const state = savedBlogsReducer(undefined, { type: '@@INIT' });
    expect(state.blogs).toEqual([]);
});

test('Should set saved blogs', () => {
    const action = {
        type: 'SET_SAVED_BLOGS',
        blogs
    };
    const state = savedBlogsReducer(undefined, action);
    expect(state.blogs).toEqual(blogs);
});

test('Should unset saved blogs', () => {
    const currentState = { blogs };
    const action = {
        type: 'UNSET_SAVED_BLOGS'
    };
    const state = savedBlogsReducer(currentState, action);
    expect(state.blogs).toEqual([]);
});

test('Should save blog on saved blogs', () => {
    const action = {
        type: 'SAVE_BLOG',
        blog: blogs[1]
    };
    const state = savedBlogsReducer(undefined, action);
    expect(state.blogs).toEqual([ blogs[1] ]);
});

test('Should not unsave blog from saved blogs if bid not found', () => {
    const currentState = { blogs: [ blogs[1] ] }
    const action = {
        type: 'UNSAVE_BLOG',
        bid: '-1'
    };
    const state = savedBlogsReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should unsave blog from saved blogs', () => {
    const currentState = { blogs: [ blogs[1] ] }
    const action = {
        type: 'UNSAVE_BLOG',
        bid: blogs[1].id
    };
    const state = savedBlogsReducer(currentState, action);
    expect(state.blogs).toEqual([]);
});

test('Should not edit blog on saved blogs if bid not found', () => {
    const currentState = { blogs };
    const title = 'New title from saved blogs';
    const action = {
        type: 'EDIT_BLOG_FROM_SB',
        bid: '-1',
        updates: { title }
    };
    const state = savedBlogsReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should edit blog on saved blogs', () => {
    const currentState = { blogs };
    const title = 'New title from saved blogs';
    const action = {
        type: 'EDIT_BLOG_FROM_SB',
        bid: blogs[0].id,
        updates: { title }
    };
    const state = savedBlogsReducer(currentState, action);
    expect(state.blogs[0].title).toBe(title);
    //To make sure that the reducer editing just the blog with the correct id
    expect(state.blogs[1].title).not.toBe(title);
});