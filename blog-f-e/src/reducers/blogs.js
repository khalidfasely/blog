const blogsReducerDefaultState = [];

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
        default:
            return state;
    }
};