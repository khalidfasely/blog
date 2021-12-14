import {
    setUser, register,
    login, logout,
    l_blog, u_blog,
    l_comment, u_comment,
    s_blog, u_s_blog,
} from "../../actions/auth";
import { blog1 as blog } from "../fixtures/blog";
import blogs from "../fixtures/blogs";

test('Should set user action object with provided data', () => {
    const providedData = {
        uname: 'User',
        commentsLiked: blog.comments,
        blogsLiked: blogs,
        blogsSaved: blogs
    };
    const action = setUser(providedData);
    expect(action).toEqual({
        type: 'SET_USER',
        ...providedData
    });
});

test('Should set user action object without data', () => {
    const action = setUser();
    expect(action).toEqual({
        type: 'SET_USER'
    });
});

test('Should set login action object with provided data', () => {
    const providedData = {
        uname: 'User',
        commentsLiked: blog.comments,
        blogsLiked: blogs,
        blogsSaved: blogs
    };
    const action = login(providedData);
    expect(action).toEqual({
        type: 'LOGIN',
        ...providedData
    });
});

test('Should set login action object without data', () => {
    const action = login();
    expect(action).toEqual({
        type: 'LOGIN'
    });
});

test('Should set register action object with provided data', () => {
    const providedData = {
        uname: 'User',
        commentsLiked: blog.comments,
        blogsLiked: blogs,
        blogsSaved: blogs
    };
    const action = register(providedData);
    expect(action).toEqual({
        type: 'REGISTER',
        ...providedData
    });
});

test('Should set register action object without data', () => {
    const action = register();
    expect(action).toEqual({
        type: 'REGISTER'
    });
});

test('Should set logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});

test('Should set like comment action object', () => {
    const cid = 2;
    const action = l_comment(cid);
    expect(action).toEqual({
        type: 'L_COMMENT',
        cid
    });
});

test('Should set unlike comment action object', () => {
    const cid = 2;
    const action = u_comment(cid);
    expect(action).toEqual({
        type: 'U_COMMENT',
        cid
    });
});

test('Should set like blog action object', () => {
    const bid = 1;
    const action = l_blog(bid);
    expect(action).toEqual({
        type: 'L_BLOG',
        bid
    });
});

test('Should set unlike blog action object', () => {
    const bid = 1;
    const action = u_blog(bid);
    expect(action).toEqual({
        type: 'U_BLOG',
        bid
    });
});

test('Should set save blog action object', () => {
    const bid = 1;
    const action = s_blog(bid);
    expect(action).toEqual({
        type: 'S_BLOG',
        bid
    });
});

test('Should set unsave blog action object', () => {
    const bid = 1;
    const action = u_s_blog(bid);
    expect(action).toEqual({
        type: 'U_S_BLOG',
        bid
    });
});