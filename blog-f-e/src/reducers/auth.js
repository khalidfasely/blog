const authReducerDefaultState = {
    uname: undefined,
    commentsLiked: [],
    blogsLiked: [],
    blogsSaved: []
};

export default (state = authReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                uname: action.uname,
                commentsLiked: action.commentsLiked,
                blogsLiked: action.blogsLiked,
                blogsSaved: action.blogsSaved
            }
        case 'LOGIN':
            return {
                ...state,
                uname: action.uname,
                commentsLiked: action.commentsLiked,
                blogsLiked: action.blogsLiked,
                blogsSaved: action.blogsSaved
            }
        case 'LOGOUT':
            return {
                ...state,
                uname: undefined,
                commentsLiked: [],
                blogsLiked: [],
                blogsSaved: []
            };
        case 'REGISTER':
            return {
                ...state,
                uname: action.uname,
                commentsLiked: action.commentsLiked,
                blogsLiked: action.blogsLiked,
                blogsSaved: action.blogsSaved
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
        case 'L_BLOG':
            //console.log(state);
            return {
                ...state,
                blogsLiked: [...state.blogsLiked, `${action.bid}`]
                //...state.blogsLiked.push(`${action.bid}`)
            }
            //console.log(b_l);
            //return b_l;
        case 'U_BLOG':
            return {
                ...state,
                blogsLiked: [...state.blogsLiked.filter(blogId => blogId !== `${action.bid}`//{
                    //console.log(blogId !== `${action.bid}`, blogId, `${action.bid}`)
                    //return blogId !== `${action.bid}`}
                    )]
            }
        case 'S_BLOG':
            return {
                ...state,
                blogsSaved: [...state.blogsSaved, `${action.bid}`]
            }
        case 'U_S_BLOG':
            return {
                ...state,
                blogsSaved: [...state.blogsSaved.filter(blogId => blogId !== `${action.bid}`)]
            }
        default:
            return state;
    }
};