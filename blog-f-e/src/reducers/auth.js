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
        case 'L_COMMENT':
            //console.log(state.commentsLiked)
            return {
                ...state,
                ...state.commentsLiked.push(`${action.cid}`)
            }
        case 'U_COMMENT':
            //console.log(state.commentsLiked, [...state.commentsLiked.filter(commentId => commentId !== `${action.cid}`)])
            return {
                ...state,
                commentsLiked: [...state.commentsLiked.filter(commentId => commentId !== `${action.cid}`)]
            }
        default:
            return state;
    }
};