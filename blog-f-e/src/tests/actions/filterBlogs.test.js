import { filterBySearch } from "../../actions/filterBlogs";

test('Should setup filter by search action object', () => {
    const action = filterBySearch('React');
    expect(action).toEqual({
        type: 'FILTER_BY_SEARCH',
        searchValue: 'React'
    });
});