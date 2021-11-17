const savedBlogsReducerDefaultState = [];

export default (state = savedBlogsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_SAVED_BLOGS':
            return {
                ...state,
                blogs: action.blogs
            };
        case 'UNSET_SAVED_BLOGS':
            return {
                ...state,
                blogs: []
            }
        case 'SAVE_BLOG':
            return {
                ...state,
                blogs: [action.blog, ...state.blogs]
            }
        case 'UNSAVE_BLOG':
            return {
                ...state,
                blogs: state.blogs.filter(blog => blog.id !== action.bid)
            }
        case 'EDIT_BLOG_FROM_SB':
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