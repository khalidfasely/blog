const filterReducerDefaultState = {
    searchValue: ''
};

export default (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'FILTER_BY_SEARCH':
            return {
                ...state,
                searchValue: action.searchValue
            };
        default:
            return state;
    }
};