import blogPageReducer from "../../reducers/blogPage";
import { blog1, blog2 } from "../fixtures/blog";

test('Should blogPage reducer with default state', () => {
    const state = blogPageReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('Should set blog', () => {
    const action = {
        type: 'SET_BLOG',
        blog: blog1
    };
    const state = blogPageReducer(undefined, action);
    expect(state).toEqual([ blog1 ]);
});

test('Should not add comment if id not found', () => {
    const currentState = [ blog1, blog2 ];
    const comment = {
        id: 9,
        content: 'comment3',
        createdBy: 'Anonymous',
        createdAt: '16 Nov 2021',
        likes: 1
    };
    const action = {
        type: 'ADD_COMMENT',
        comment,
        id: '-1'
    };
    const state = blogPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should add comment', () => {
    const currentState = [ blog1, blog2 ];
    const comment = {
        id: 9,
        content: 'comment3',
        createdBy: 'Anonymous',
        createdAt: '16 Nov 2021',
        likes: 1
    };
    const action = {
        type: 'ADD_COMMENT',
        comment,
        id: blog1.id
    };
    const state = blogPageReducer(currentState, action);
    expect(state[0].comments.length).toBe(3);
    expect(state[1].comments.length).toBe(1);
});

test('Should not like blog if bid not found', () => {
    const currentState = [ blog1, blog2 ];
    const action = {
        type: 'LIKE_BLOG',
        bid: '-1'
    };
    const state = blogPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should like blog', () => {
    const currentState = [ blog1, blog2 ];
    const action = {
        type: 'LIKE_BLOG',
        bid: blog2.id
    };
    const state = blogPageReducer(currentState, action);
    expect(state[1].likes).toBe(blog2.likes + 1);
    expect(state[0].likes).toBe(blog1.likes);
});

test('Should not unlike blog if bid not found', () => {
    const currentState = [ blog1, blog2 ];
    const action = {
        type: 'UNLIKE_BLOG',
        bid: '-1'
    };
    const state = blogPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should unlike blog', () => {
    const currentState = [ blog1, blog2 ];
    const action = {
        type: 'UNLIKE_BLOG',
        bid: blog1.id
    };
    const state = blogPageReducer(currentState, action);
    expect(state[0].likes).toBe(blog1.likes - 1);
    expect(state[1].likes).toBe(blog2.likes);
});

test('Should not like comment if bid not found', () => {
    const currentState = [ blog1, blog2 ];
    const action = {
        type: 'LIKE_COMMENT',
        bid: '-1',
        cid: blog1.comments[0].id
    };
    const state = blogPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should not like comment if cid not found', () => {
    const currentState = [ blog1, blog2 ];
    const action = {
        type: 'LIKE_COMMENT',
        bid: blog1.id,
        cid: -1
    };
    const state = blogPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should like comment', () => {
    const commentLikes = blog1.comments[0].likes;
    const currentState = [ blog1, blog2 ];
    const action = {
        type: 'LIKE_COMMENT',
        bid: blog1.id,
        cid: blog1.comments[0].id
    };
    const state = blogPageReducer(currentState, action);
    expect(state[0].comments[0].likes).toBe(commentLikes + 1);
    expect(state[0].comments[1].likes).toBe(blog1.comments[1].likes);
    expect(state[1].comments[0].likes).toBe(blog2.comments[0].likes);
});

test('Should not unlike comment if bid not found', () => {
    const currentState = [ blog1, blog2 ];
    const action = {
        type: 'UNLIKE_COMMENT',
        bid: -1,
        cid: blog1.comments[0].id
    };
    const state = blogPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should not unlike comment if cid not found', () => {
    const currentState = [ blog1, blog2 ];
    const action = {
        type: 'UNLIKE_COMMENT',
        bid: blog1.id,
        cid: '-1'
    };
    const state = blogPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should unlike comment', () => {
    const commentLikes = blog1.comments[0].likes;
    const currentState = [ blog1, blog2 ];
    const action = {
        type: 'UNLIKE_COMMENT',
        bid: blog1.id,
        cid: blog1.comments[0].id
    };
    const state = blogPageReducer(currentState, action);
    expect(state[0].comments[0].likes).toBe(commentLikes - 1);
    expect(state[0].comments[1].likes).toBe(blog1.comments[1].likes);
    expect(state[1].comments[0].likes).toBe(blog2.comments[0].likes);
});

test('Should not remove blog from blog page if bid not found', () => {
    const currentState = [ blog1 ];
    const action = {
        type: 'REMOVE_BLOG_FROM_BP',
        bid: -1
    };
    const state = blogPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should remove blog from blog page', () => {
    const currentState = [ blog1 ];
    const action = {
        type: 'REMOVE_BLOG_FROM_BP',
        bid: blog1.id
    };
    const state = blogPageReducer(currentState, action);
    expect(state.length).toBe(0);
});

test('Should edit blog on blog page', () => {
    const currentState = [ blog1, blog2 ];
    const category = 'ReactJS';
    const action = {
        type: 'EDIT_BLOG',
        bid: blog2.id,
        updates: { category }
    };
    const state = blogPageReducer(currentState, action);
    expect(state[1].category).toBe(category);
    //Make sure that the updates apply only on the correct blog
    expect(state[0].category).toBe(blog1.category);
});

test('Should not edit blog on blog page if bid not found', () => {
    const currentState = [ blog1, blog2 ];
    const category = 'ReactJS';
    const action = {
        type: 'EDIT_BLOG',
        bid: '-1',
        updates: { category }
    };
    const state = blogPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});