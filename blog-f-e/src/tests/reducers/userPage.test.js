import userPageReducer from "../../reducers/userPage";
import { user1, user2 } from "../fixtures/user";

test('Should set userPage reducer with default state', () => {
    const state = userPageReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('Should set user on userPage reducer with default state', () => {
    const action = {
        type: 'SET_USER_PAGE',
        user: user1
    };
    const state = userPageReducer(undefined, action);
    expect(state).toEqual([user1]);
});

test('Should set user on userPage reducer', () => {
    const currentState = [user1];
    const action = {
        type: 'SET_USER_PAGE',
        user: user2
    };
    const state = userPageReducer(currentState, action);
    expect(state).toEqual([user2, user1]);
});

test('Should not edit userProfile on userPage reducer if uname not found', () => {
    const newBio = 'Test Bio Update';
    const currentState = [user1, user2]
    const action = {
        type: 'EDIT_PROFILE_INFO',
        uname: 'NotUser',
        updates: {
            bio: newBio
        }
    };
    const state = userPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should edit userProfile on userPage reducer', () => {
    const newBio = 'Test Bio Update';
    const currentState = [user1, user2]
    const action = {
        type: 'EDIT_PROFILE_INFO',
        uname: user1.uid.username,
        updates: {
            bio: newBio
        }
    };
    const state = userPageReducer(currentState, action);
    expect(state[0].bio).toBe(newBio);
    //Make sure that the editing takes effect only...
    //on the user that have the uname provided on action
    expect(state[1].bio).toBe(user2.bio);
});

test('Should not add blog on userPage if id not found', () => {
    const currentState = [user1, user2];
    const newBlog = {
        id: 6,
        title: 'title',
        description: 'description',
        createdBy: 'Admin',
        content: 'content',
        category: 'Web',
        likes: 1,
        dislikes: 0,
        createdAt: '10 Nov 2021'
    };
    const action = {
        type: 'ADD_BLOG_PROFILE',
        id: '-1',
        blog: newBlog
    };
    const state = userPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should add blog on userPage', () => {
    const currentState = [user1, user2];
    const newBlog = {
        id: 6,
        title: 'title',
        description: 'description',
        createdBy: 'Admin',
        content: 'content',
        category: 'Web',
        likes: 1,
        dislikes: 0,
        createdAt: '10 Nov 2021'
    };
    const action = {
        type: 'ADD_BLOG_PROFILE',
        id: user1.uid.id,
        blog: newBlog
    };
    const state = userPageReducer(currentState, action);
    expect(state[0].blogs.length).toBe(3);
    expect(state[1].blogs.length).toBe(1);
});

test('Should remove blog from userPage if uname not found', () => {
    const currentState = [user1, user2];
    const action = {
        type: 'REMOVE_BLOG_FROM_UP',
        uname: 'NotUser',
        bid: user2.blogs[0].id
    };
    const state = userPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should not remove blog from userPage if bid not found', () => {
    const currentState = [user1, user2];
    const action = {
        type: 'REMOVE_BLOG_FROM_UP',
        uname: user2.uid.username,
        bid: '-1'
    };
    const state = userPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should remove blog from userPage', () => {
    const currentState = [user1, user2];
    const action = {
        type: 'REMOVE_BLOG_FROM_UP',
        uname: user2.uid.username,
        bid: user2.blogs[0].id
    };
    const state = userPageReducer(currentState, action);
    expect(state[0].blogs.length).toBe(2);
    expect(state[1].blogs.length).toBe(0);
});

test('Should not edit blog from userPage if uname not found', () => {
    const currentState = [user1, user2];
    const newTitle = 'New title';
    const newCategory = 'DjangoPY';
    const action = {
        type: 'EDIT_BLOG_FROM_UP',
        uname: 'NotUser',
        bid: 2,
        updates: {
            title: newTitle,
            category: newCategory
        }
    };
    const state = userPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should not edit blog from userPage if bid not found', () => {
    const currentState = [user1, user2];
    const newTitle = 'New title';
    const newCategory = 'DjangoPY';
    const action = {
        type: 'EDIT_BLOG_FROM_UP',
        uname: user2.uid.username,
        bid: '-1',
        updates: {
            title: newTitle,
            category: newCategory
        }
    };
    const state = userPageReducer(currentState, action);
    expect(state).toEqual(currentState);
});

test('Should edit blog from userPage', () => {
    const currentState = [user1, user2];
    const newTitle = 'New title';
    const newCategory = 'DjangoPY';
    const action = {
        type: 'EDIT_BLOG_FROM_UP',
        uname: user2.uid.username,
        bid: 2,
        updates: {
            title: newTitle,
            category: newCategory
        }
    };
    const state = userPageReducer(currentState, action);
    expect(state[1].blogs[0].title).toBe(newTitle);
    expect(state[1].blogs[0].category).toBe(newCategory);
});