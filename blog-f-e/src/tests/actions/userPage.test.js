import { addBlogToProfile, editBlogFromUP, editProfile, removeBlogFromUP, setUserPage } from "../../actions/userPage";
import blogs from "../fixtures/blogs";
import { user1 as user } from "../fixtures/user";

test('Should set user page action object', () => {
    const action = setUserPage(user);
    expect(action).toEqual({
        type: 'SET_USER_PAGE',
        user
    });
});

test('Should add blog to profile action object', () => {
    const id = 'abc123';
    const action = addBlogToProfile(blogs[0], id);
    expect(action).toEqual({
        type: 'ADD_BLOG_PROFILE',
        blog: blogs[0],
        id
    })
});

test('Should remove blog from user profile action object', () => {
    const uname = 'user';
    const bid = 8;
    const action = removeBlogFromUP(uname, bid);
    expect(action).toEqual({
        type: 'REMOVE_BLOG_FROM_UP',
        uname,
        bid
    })
});

test('Should edit blog from user profile action object', () => {
    const uname = 'user';
    const bid = 6;
    const updates = { title: 'New title' };
    const action = editBlogFromUP({ uname, bid }, updates);
    expect(action).toEqual({
        type: 'EDIT_BLOG_FROM_UP',
        uname,
        bid,
        updates
    });
});

test('Should edit profile action object', () => {
    const uname = 'user';
    const updates = { bio: 'New bio' };
    const action = editProfile(uname, updates);
    expect(action).toEqual({
        type: 'EDIT_PROFILE_INFO',
        uname,
        updates
    });
});