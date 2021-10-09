const blogPageReducerDefaultState = [];

export default (state = blogPageReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_BLOG':
            return [
                action.blog,
                ...state
            ];
        default:
            return state;
    }
};