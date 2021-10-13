const blogPageReducerDefaultState = [];

export default (state = blogPageReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_BLOG':
            return [
                action.blog,
                ...state
            ];
        case 'ADD_COMMENT':
            const blogs = [];
            state.map((blog) => {
                const comment = action.comment;
                if(blog.id === action.id) {
                    blogs.push({
                            ...blog,
                            ...blog.comments.push(comment)
                        });
                } else {
                    blogs.push(blog);
                };
            })
            return [...blogs];
            //return [
            //    //...state,
            //    state.map((blog) => {
            //        const comment = action.comment;
            //        console.log(blog.id, action.id)
            //        if(blog.id === action.id) {
            //            console.log('if', blog);
            //            return {
            //                ...blog,
            //                comments: {
            //                    ...blog.comments,
            //                    comment
            //                }
            //            };
            //        } else {
            //            console.log('else', blog[0]);
            //            return blog[0];
            //        };
            //    })
            //]
        default:
            return state;
    }
};