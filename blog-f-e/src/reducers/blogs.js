const blogsReducerDefaultState = {
    blogs: []
};

export default (state = blogsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return {
                ...state,
                blogs: action.blogs
            };
        case 'ADD_BLOG':
            return {
                ...state,
                blogs: [
                    action.blog,
                    ...state.blogs
                ]
            };
        case 'DELETE_BLOG':
            return {
                ...state,
                blogs: [
                    ...state.blogs.filter(blog => blog.id !== action.bid)
                ]
            }
        case 'EDIT_BLOG_FROM_BP':
            return {
                ...state,
                blogs: [
                    ...state.blogs.map(blog => {
                        if (blog.id === action.bid) {
                            return {
                                ...blog,
                                ...action.updates
                            }
                        } else {
                            return blog;
                        }
                    })
                ]
            }
        default:
            return state;
    }
};