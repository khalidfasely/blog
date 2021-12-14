import { setCategories } from "../../actions/categories";

test('Should setup categories action object', () => {
    const categories = ['Web', 'React', 'Django'];
    const action = setCategories(categories);
    expect(action).toEqual({
        type: 'SET_CATEGORIES',
        categories
    });
});