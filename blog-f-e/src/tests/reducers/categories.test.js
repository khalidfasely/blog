import categoriesReducer from '../../reducers/categories';

test('Should set categories with default state', () => {
    const state = categoriesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('Should set categories', () => {
    const categories = ['Web', 'Django', 'React'];
    const action = {
        type: 'SET_CATEGORIES',
        categories
    };
    const state = categoriesReducer([], action);
    expect(state).toEqual(action.categories);
});