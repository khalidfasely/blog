const authReducerDefaultState = {
    uname: undefined
};

export default (state = authReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                uname: action.uname
            }
        case 'LOGIN':
            return {
                ...state,
                uname: action.uname
            }
        case 'LOGOUT':
            return {
                ...state,
                uname: undefined
            };
        case 'REGISTER':
            return {
                ...state,
                uname: action.uname
            }
        default:
            return state;
    }
};