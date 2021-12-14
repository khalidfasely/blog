import blogsReducer from '../../reducers/blogs';
import blogs from '../fixtures/blogs';

test('Should setup blogs reducer with default', () => {
    const state = blogsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({ blogs: [] });
});

test('Should set blogs reducer with blogs', () => {
    const action = {
        type: 'SET_BLOGS',
        blogs
    };
    const state = blogsReducer(undefined, action);
    expect(state.blogs).toEqual(blogs);
});

test('Should add blog on blogs reducer with default state', () => {
    const action = {
        type: 'ADD_BLOG',
        blog: blogs[0]
    };
    const state = blogsReducer(undefined, action);
    expect(state.blogs).toEqual([ blogs[0] ]);
});

test('Should add blog on blogs reducer', () => {
    const currentState = {
        blogs: [ blogs[1], blogs[2] ]
    };
    const action = {
        type: 'ADD_BLOG',
        blog: blogs[0]
    };
    const state = blogsReducer(currentState, action);
    expect(state.blogs).toEqual(blogs);
});

test('Should not delete blog on blogs reducer if bid not found', () => {
    const currentState = { blogs };
    const state = blogsReducer(currentState, { type: 'DELETE_BLOG', bid: '-1' });
    expect(state).toEqual(currentState);
});

test('Should delete blog on blogs reducer', () => {
    const currentState = { blogs };
    const state = blogsReducer(currentState, { type: 'DELETE_BLOG', bid: 2 });
    expect(state.blogs).toEqual([ blogs[0], blogs[2] ]);
});

test('Should not edit blog on blogs reducer if bid not found', () => {
    const currentState = { blogs };
    const updates = { category: 'ReactJS' };
    const action = {
        type: 'EDIT_BLOG_FROM_BP',
        bid: '-1',
        updates
    };
    const state = blogsReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should edit blog on blogs reducer', () => {
    const currentState = { blogs };
    const updates = { category: 'ReactJS' };
    const action = {
        type: 'EDIT_BLOG_FROM_BP',
        bid: 3,
        updates
    };
    const state = blogsReducer(currentState, action);
    expect(state.blogs[2].category).toEqual('ReactJS');
});