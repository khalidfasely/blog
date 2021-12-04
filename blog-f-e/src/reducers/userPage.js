const userPageReducerDefaultState = [];

export default (state = userPageReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_USER_PAGE':
            return [
                action.user,
                ...state
            ];
        case 'EDIT_PROFILE_INFO':
            return [
                ...state.map(profileItem => {
                    if (profileItem.uid.username === action.uname) {
                        return {
                            ...profileItem,
                            ...action.updates
                        }
                    } else {
                        return profileItem;
                    }
                })
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
            ];
        case 'REMOVE_BLOG_FROM_UP':
            return [
                ...state.map(profileItem => {
                    if (profileItem.uid.username === action.uname) {
                        return {
                            ...profileItem,
                            blogs: profileItem.blogs.filter(blog => blog.id !== action.bid)
                        }
                    } else {
                        return profileItem;
                    }
                })
            ];
        case 'EDIT_BLOG_FROM_UP':
            return [
                ...state.map(profileItem => {
                    if (profileItem.uid.username === action.uname) {
                        return {
                            ...profileItem,
                            blogs: profileItem.blogs.map(blog => {
                                if (blog.id === action.bid) {
                                    return {
                                        ...blog,
                                        ...action.updates
                                    };
                                } else {
                                    return blog;
                                }
                            })
                        }
                    } else {
                        return profileItem;
                    }
                })
            ];
        default:
            return state;
    }
};