import filterReducer from '../../reducers/filterBlogs';

test('Should generate set filterReducer with default state', () => {
    const state = filterReducer(undefined, { type: '@@INIT' });
    expect(state.searchValue).toBe('');
});

test('Should generate set filterReducer with searchValue', () => {
    const searchValue = 'Something';
    const action = {
        type: 'FILTER_BY_SEARCH',
        searchValue
    };
    const state = filterReducer(undefined, action);
    expect(state.searchValue).toBe(searchValue);
});

test('Should generate change searchValue', () => {
    const newSearchValue = 'New search value';
    const currentState = { searchValue: 'Something' };
    const action = {
        type: 'FILTER_BY_SEARCH',
        searchValue: newSearchValue
    };
    const state = filterReducer(currentState, action);
    expect(state.searchValue).toBe(newSearchValue);
});