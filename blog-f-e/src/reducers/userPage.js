const userPageReducerDefaultState = [];

export default (state = userPageReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_USER_PAGE':
            return [
                action.userPage,
                ...state
            ];
        default:
            return state;
    }
};