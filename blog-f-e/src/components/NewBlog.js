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
    const [ titleError, setTitleError ] = useState('');
    const [ descriptionError, setDescriptionError ] = useState('');
    const [ contentError, setContentError ] = useState('');
    const [ categoryError, setCategoryError ] = useState('');

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

        setTitleError('');
        setDescriptionError('');
        setContentError('');
        setCategoryError('');

        //const availabelData = (title.replace(/\s/g, '') && description.replace(/\s/g, '') && content.replace(/\s/g, '') && category);
        const availabelTitle = title.replace(/\s/g, '').length >= 90;
        const availabelDescription = description.replace(/\s/g, '').length >= 255;
        const availabelContent = content.replace(/\s/g, '').length >= 500;
        const availabelData = (availabelTitle && availabelDescription && availabelContent && category);

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
            if(!availabelTitle){
                setTitleError('The title\'s length should be 90 or more.');
            }
            if(!availabelDescription){
                setDescriptionError('The description\'s length should be 255 or more.');
            }
            if(!availabelContent){
                setContentError('The content\'s length should be 500 or more.');
            }
            if(!category){
                setCategoryError('Set a category to the Blog.');
            }
            //setError('Fill out all the fields || The title\'s length should be 90 or more, The description\'s length should be 255 or more, And the content\'s length should be 500 or more.');
        }
    };

    const editing = () => {
        (title.replace(/\s/g, '') && description.replace(/\s/g, '') && content.replace(/\s/g, '') && category) && edit();
    }

    return (
        <div>
            {error && <div>{error}</div>}
            <form onSubmit={onFormSubmit}>
                <label for='title_new'>Title:</label>
                <textarea
                  id='title_new'
                  placeholder='Title (More than 90 characters)'
                  autoFocus
                  maxLength={120}
                  value={title}
                  onChange={onTitleChange}
                />
                {titleError && <p>{titleError}</p>}
                <label for='description_new'>Description:</label>
                <textarea
                  id='description_new'
                  placeholder='Description (More than 255 characters)'
                  maxLength={300}
                  value={description}
                  onChange={onDescriptionChange}
                />
                {descriptionError && <p>{descriptionError}</p>}
                <label for='content_new'>Content:</label>
                <textarea
                  id='content_new'
                  placeholder='Content (More than 500 characters)'
                  value={content}
                  onChange={onContentChange}
                />
                {contentError && <p>{contentError}</p>}
                <label for='category_new'>Category:</label>
                <select id='category_new' onChange={onCategoryChange}>
                    {
                        isEdit ?
                        <option disabled selected value={category}>{category}</option> :
                        <option disabled selected value=''>--Select Category--</option>
                    }
                    {
                        categories.map((category) => <option value={category}>{category}</option>)
                    }
                </select>
                {categoryError && <p>{categoryError}</p>}
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