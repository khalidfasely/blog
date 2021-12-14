import authReducer from "../../reducers/auth";

let defaultState, testData;

beforeEach(() => {
    defaultState = {
        uname: undefined,
        commentsLiked: [],
        blogsLiked: [],
        blogsSaved: []
    };
    testData = {
        uname: 'User',
        commentsLiked: ['7', '11'],
        blogsLiked: ['1'],
        blogsSaved: ['1']
    };
});

test('Should set auth with default state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultState);
});

test('Should set user', () => {
    const action = {
        type: 'SET_USER',
        ...testData
    };
    const state = authReducer(undefined, action);
    expect(state.uname).toBe(testData.uname);
});

test('Should login user', () => {
    const action = {
        type: 'LOGIN',
        ...testData
    };
    const state = authReducer(undefined, action);
    expect(state.blogsLiked).toBe(testData.blogsLiked);
});

test('Should logout user', () => {
    const state = authReducer(testData, { type: 'LOGOUT' });
    expect(state).toEqual(defaultState);
});

test('Should register user', () => {
    const action = {
        type: 'REGISTER',
        ...testData
    };
    const state = authReducer(undefined, action);
    expect(state.commentsLiked).toBe(testData.commentsLiked);
});

test('Should like comment', () => {
    const cid = '2';
    const action = {
        type: 'L_COMMENT',
        cid
    };
    const state = authReducer(testData, action);
    expect(state.commentsLiked.length).toBe(3);
    expect(state.commentsLiked).toContain(cid);
});

test('Should unlike comment', () => {
    const cid = '7';
    const action = {
        type: 'U_COMMENT',
        cid
    };
    const state = authReducer(testData, action);
    expect(state.commentsLiked.length).toBe(1);
    expect(state.commentsLiked).not.toContain(cid);
});

test('Should like blog', () => {
    const bid = '6';
    const action = {
        type: 'L_BLOG',
        bid
    };
    const state = authReducer(testData, action);
    expect(state.blogsLiked.length).toBe(2);
    expect(state.blogsLiked).toContain(bid);
});

test('Should unlike blog', () => {
    const bid = '1';
    const action = {
        type: 'U_BLOG',
        bid
    };
    const state = authReducer(testData, action);
    expect(state.blogsLiked.length).toBe(0);
    expect(state.blogsLiked).not.toContain(bid);
});

test('Should save blog', () => {
    const bid = '6';
    const action = {
        type: 'S_BLOG',
        bid
    };
    const state = authReducer(testData, action);
    expect(state.blogsSaved.length).toBe(2);
    expect(state.blogsSaved).toContain(bid);
});

test('Should unsave blog', () => {
    const bid = '1';
    const action = {
        type: 'U_S_BLOG',
        bid
    };
    const state = authReducer(testData, action);
    expect(state.blogsSaved.length).toBe(0);
    expect(state.blogsSaved).not.toContain(bid);
});