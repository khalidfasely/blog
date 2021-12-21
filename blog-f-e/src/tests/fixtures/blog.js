export const blog1 = {
    id: 2,
    title: 'title2',
    description: 'description',
    content: 'content',
    created_by: {
        id: 2,
        username: 'Anonymous'
    },
    category: 'Django',
    created_at: '15 Nov 2021',
    likes: 5,
    dislikes: 0,
    comments: [{
        id: 4,
        content: 'comment',
        created_by: {
            id: 1,
            username: 'Admin'
        },
        created_at: '15 Nov 2021',
        likes: 0
    }, {
        id: 7,
        content: 'comment2',
        created_by: {
            id: 2,
            username: 'Anonymous'
        },
        created_at: '16 Nov 2021',
        likes: 2
    }]
};

export const blog2 = {
    id: 3,
    title: 'title5',
    description: 'description',
    content: 'content',
    created_by: {
        id: 3,
        username: 'User'
    },
    category: 'React',
    created_at: '15 Nov 2021',
    likes: 3,
    dislikes: 0,
    comments: [{
        id: 12,
        content: 'comment',
        created_by: {
            id: 1,
            username: 'Admin'
        },
        created_at: '15 Nov 2021',
        likes: 0
    }]
};