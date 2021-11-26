import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { startEditBlog } from '../actions/blogPage';
import { editBlogFromBP, startAddBlog } from '../actions/blogs';
import { editBlogFromSB } from '../actions/savedBlogs';
import { addBlogToProfile, editBlogFromUP } from '../actions/userPage';
import editBlog from '../fetching/editBlog';
import { history } from '../router/AppRouter';

const NewBlog = ({
        uname,
        profileList,
        startAddBlog,
        addBlogToProfile,
        isEdit,
        blog,
        edit,
        startEditBlog,
        editBlogFromBP,
        savedBlogs,
        editBlogFromSB,
        editBlogFromUP,
        categories
    }) => {
    const titleDefault = blog ? blog.title : '';
    const [ title, setTitle ] = useState(titleDefault);
    const descriptionDefault = blog ? blog.description : '';
    const [ description, setDescription ] = useState(descriptionDefault);
    const contentDefault = blog ? blog.content : '';
    const [ content, setContent ] = useState(contentDefault);
    const categoryDefault = blog ? blog.category : '';
    const [ category, setCategory ] = useState(categoryDefault);
    const [ error, setError ] = useState('');

    useEffect(() => {
        if(!isEdit){
            document.title = 'Create a Blog - Blog';
        }
    }, [])

    const onTitleChange = (e) => {
        const title = e.target.value;
        setTitle(title);
    }

    const onDescriptionChange = (e) => {
        const description = e.target.value;
        setDescription(description);
    }

    const onContentChange = (e) => {
        const content = e.target.value;
        setContent(content);
    }

    const onCategoryChange = (e) => {
        const category = e.target.value;
        setCategory(category);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        const availabelData = (title.replace(/\s/g, '') && description.replace(/\s/g, '') && content.replace(/\s/g, '') && category);

        if (availabelData && !isEdit) {
            startAddBlog({ title, description, content, category }).then((result) => {
                if (result.message !== "Blog Created") {
                    setError(result.message);
                } else {
                    setError('');
                    profileList.map(profileItem => {
                        if (profileItem.uid.username === uname) {
                            // Create addBlogToProfile on userPage Action
                            addBlogToProfile(result.blog, profileItem.uid.id);
                        } else {
                            //console.log(false);
                        }
                    });
                    history.push('/');
                }
            });
        } else if (availabelData && isEdit) {
            setError('');
            //Edit It On blogPageReducer
            startEditBlog(blog.id, {uname, title, description, content, category})
            .then(() => {
                history.push('/');
                history.push(`/blog/${blog.id}`);
            })
            .then(() => {
                //Edit It On blogPageReducer
                editBlogFromBP(blog.id, {title, description, category});
            })
            .then(() => {
                //Check if blog is on savedBlogs
                savedBlogs.map(blogS => {
                    if (blogS.id === blog.id) {
                        editBlogFromSB(blog.id, {title, description, category});
                    }
                })
            })
            .then(() => {
                //Check if blog.created_by is on profileList
                profileList.map(profileItem => {
                    const profileUsername = profileItem.uid.username;
                    if (profileUsername === uname) {
                        editBlogFromUP({uname, bid: blog.id}, {title, description, category});
                    }
                })
            });
        } else {
            setError('Fill out all fields And Select a Category!');
        }
    };

    const editing = () => {
        (title.replace(/\s/g, '') && description.replace(/\s/g, '') && content.replace(/\s/g, '') && category) && edit();
    }

    return (
        <div>
            {error && <div>{error}</div>}
            <form onSubmit={onFormSubmit}>
                <textarea
                  placeholder='Title'
                  autoFocus
                  minLength={90}
                  maxLength={120}
                  value={title}
                  onChange={onTitleChange}
                />
                <textarea
                  placeholder='Description'
                  minLength={255}
                  maxLength={300}
                  value={description}
                  onChange={onDescriptionChange}
                />
                <textarea
                  placeholder='Content'
                  minLength={500}
                  value={content}
                  onChange={onContentChange}
                />
                <select onChange={onCategoryChange}>
                    {
                        isEdit ?
                        <option disabled selected value={category}>{category}</option> :
                        <option disabled selected value=''>--Select Category--</option>
                    }
                    {
                        categories.map((category) => <option value={category}>{category}</option>)
                    }
                </select>
                {
                    isEdit ?
                    <button onClick={editing}>Edit Blog</button> :
                    <button>Create Blog</button>
                }
            </form>
        </div>
    );
};//<option disabled selected value=''>--Select Category--</option>

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
    profileList: state.userPage,
    savedBlogs: state.savedBlogs.blogs,
    categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
    startAddBlog: (blog) => dispatch(startAddBlog(blog)),
    addBlogToProfile: (blog, id) => dispatch(addBlogToProfile(blog, id)),
    startEditBlog: (bid, updates) => dispatch(startEditBlog(bid, updates)),
    editBlogFromBP: (bid, updates) => dispatch(editBlogFromBP(bid, updates)),
    editBlogFromSB: (bid, updates) => dispatch(editBlogFromSB(bid, updates)),
    editBlogFromUP: (bid, updates) => dispatch(editBlogFromUP(bid, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewBlog);