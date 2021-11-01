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
        default:
            return state;
    }
};