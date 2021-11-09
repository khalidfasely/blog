const userPageReducerDefaultState = [];

export default (state = userPageReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_USER_PAGE':
            return [
                action.user,
                ...state
            ];
        case 'ADD_BLOG_PROFILE':
            return [
                ...state.map(profileItem => {
                    if (profileItem.uid.id === action.id) {
                        return {
                            ...profileItem,
                            blogs: [
                                action.blog,
                                ...profileItem.blogs
                            ]
                        }
                    } else {
                        return profileItem;
                    }
                })
            ]
        default:
            return state;
    }
};