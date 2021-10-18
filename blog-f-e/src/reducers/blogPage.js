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
        case 'LIKE_COMMENT':
            const blogsLC = [];
            state.map((blog) => {
                const cid = action.cid;
                if(blog.id === action.bid) {
                    blogsLC.push({
                            ...blog,
                            ...blog.comments.map(comment => {
                                if (cid === comment.id) {
                                    return {
                                        ...comment,
                                        likes: comment.likes++
                                    }
                                } else {
                                    return comment;
                                }
                            })
                        });
                } else {
                    blogsLC.push(blog);
                };
            })
            return [...blogsLC];
        case 'UNLIKE_COMMENT':
            const blogsUC = [];
            state.map((blog) => {
                const cid = action.cid;
                if(blog.id === action.bid) {
                    blogsUC.push({
                            ...blog,
                            ...blog.comments.map(comment => {
                                if (cid === comment.id) {
                                    const cL = comment.likes--;
                                    //console.log(comment.likes--);
                                    return {
                                        ...comment,
                                        likes: cL//comment.likes - 1
                                    }
                                } else {
                                    return comment;
                                }
                            })
                        });
                } else {
                    blogsUC.push(blog);
                };
            })
            return [...blogsUC];
        default:
            return state;
    }
};