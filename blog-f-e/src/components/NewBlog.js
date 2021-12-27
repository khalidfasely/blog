import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { startEditBlog } from '../actions/blogPage';
import { editBlogFromBP, startAddBlog } from '../actions/blogs';
import { editBlogFromSB } from '../actions/savedBlogs';
import { addBlogToProfile, editBlogFromUP } from '../actions/userPage';
import { history } from '../router/AppRouter';

export const NewBlog = ({
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
    //const titleDefault = blog ? blog.title : '';
    //const [ title, setTitle ] = useState(titleDefault);
    //const descriptionDefault = blog ? blog.description : '';
    //const [ description, setDescription ] = useState(descriptionDefault);
    //const contentDefault = blog ? blog.content : '';
    //const [ content, setContent ] = useState(contentDefault);
    //const categoryDefault = blog ? blog.category : '';
    //const [ category, setCategory ] = useState(categoryDefault);
    const [ title, setTitle ] = useState(blog ? blog.title : '');
    const [ description, setDescription ] = useState(blog ? blog.description : '');
    const [ content, setContent ] = useState(blog ? blog.content : '');
    const [ category, setCategory ] = useState(blog ? blog.category : '');
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
        const availabelDescription = description.replace(/\s/g, '').length >= 200;
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
                setDescriptionError('The description\'s length should be 200 or more.');
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
        const availabelTitle = title.replace(/\s/g, '').length >= 90;
        const availabelDescription = description.replace(/\s/g, '').length >= 200;
        const availabelContent = content.replace(/\s/g, '').length >= 500;
        const availabelData = (availabelTitle && availabelDescription && availabelContent && category);
        (availabelData) && edit();
    }

    return (
        <div className='content-container'>
            {error && <div>{error}</div>}
            <form className={isEdit ? 'blog-edit-form' : 'blog-new-form'} data-testid='form' onSubmit={onFormSubmit}>
                <div className='blog-form__lab-inp'>
                    <div>
                        <label htmlFor='title_new'>Title:</label>
                    </div>
                    <div>
                        <textarea
                          className='title-input'
                          id='title_new'
                          data-testid='title_input'
                          placeholder='Title (More than 90 characters)'
                          autoFocus
                          maxLength={120}
                          value={title}
                          onChange={onTitleChange}
                        />
                        {titleError && <p data-testid='title_error'>{titleError}</p>}
                    </div>
                </div>
                <div className='blog-form__lab-inp'>
                    <div>
                        <label htmlFor='description_new'>Description:</label>
                    </div>
                    <div>
                        <textarea
                          className='description-input'
                          id='description_new'
                          data-testid='description_input'
                          placeholder='Description (More than 255 characters)'
                          maxLength={300}
                          value={description}
                          onChange={onDescriptionChange}
                        />
                        {descriptionError && <p data-testid='description_error'>{descriptionError}</p>}
                    </div>
                </div>
                <div className='blog-form__lab-inp'>
                    <div>
                        <label htmlFor='content_new'>Content:</label>
                    </div>
                    <div>
                        <textarea
                          className='content-input'
                          id='content_new'
                          data-testid='content_input'
                          placeholder='Content (More than 500 characters)'
                          value={content}
                          onChange={onContentChange}
                        />
                        {contentError && <p data-testid='content_error'>{contentError}</p>}
                    </div>
                </div>
                <div className='blog-form__lab-inp'>
                    <div>
                        <label htmlFor='category_new'>Category:</label>
                    </div>
                    <div>
                        <select
                            className='category-selector'
                            id='category_new'
                            data-testid='category_select'
                            defaultValue={category ? category : ''}
                            onChange={onCategoryChange}
                        >
                            {
                                isEdit ?
                                <option disabled value={category}>{category}</option> :
                                <option disabled value=''>--Select Category--</option>
                            }
                            {
                                categories.map((category) => <option key={category} value={category}>{category}</option>)
                            }
                        </select>
                        {categoryError && <p data-testid='category_error'>{categoryError}</p>}
                    </div>
                </div>
                <div className='blog-form__button'>
                    {
                        isEdit ?
                        <button data-testid='edit_create_button' onClick={editing}>Edit Blog</button> :
                        <button data-testid='edit_create_button'>Create Blog</button>
                    }
                </div>
            </form>
        </div>
    );
};

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