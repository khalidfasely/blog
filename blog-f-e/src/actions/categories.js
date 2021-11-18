import getCategories from '../fetching/getCategories';

export const setCategories = (categories) => ({
    type: 'SET_CATEGORIES',
    categories
});

export const startSetCategories = () => {
    return (dispatch) => {
        return getCategories().then((result) => {
            dispatch(setCategories(result.categories));
            return result;
        });
    };
}