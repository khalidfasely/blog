import blogs from "./blogs"

export const user1 = {
    uid: {
        id: 1,
        username: 'UserAdmin'
    },
    uinfo: {
        join_date: '7 Oct 2021',
        last_login: '18 Nov 2021'
    },
    blogs: [ blogs[0], blogs[2] ],
    bio: 'MyBio'
};

export const user2 = {
    uid: {
        id: 2,
        username: 'UserAnonymous'
    },
    uinfo: {
        join_date: '9 Oct 2021',
        last_login: '10 Dec 2021'
    },
    blogs: [ blogs[1] ],
    bio: 'New User'
};