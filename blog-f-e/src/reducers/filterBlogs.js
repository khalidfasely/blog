const filterReducerDefaultState = {
    searchValue: ''
};

export default (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'FILTER_BY_SEARCH':
            console.log({
                ...state,
                searchValue: action.searchValue
            });
            return {
                ...state,
                searchValue: action.searchValue
            };
        default:
            return state;
    }
};