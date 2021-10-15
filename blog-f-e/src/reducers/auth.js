const authReducerDefaultState = {
    uname: undefined,
    commentsLiked: []
};

export default (state = authReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                uname: action.uname,
                commentsLiked: action.commentsLiked
            }
        case 'LOGIN':
            return {
                ...state,
                uname: action.uname,
                commentsLiked: action.commentsLiked
            }
        case 'LOGOUT':
            return {
                ...state,
                uname: undefined,
                commentsLiked: []
            };
        case 'REGISTER':
            return {
                ...state,
                uname: action.uname,
                commentsLiked: action.commentsLiked
            }
        default:
            return state;
    }
};