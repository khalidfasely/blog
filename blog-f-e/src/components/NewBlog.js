import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { startAddBlog } from '../actions/blogs';
import { history } from '../router/AppRouter';

const categories = ['Web', 'Ecom', 'Programming', 'Photography']

const NewBlog = ({ startAddBlog }) => {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ content, setContent ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ error, setError ] = useState('');

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

        const availabelData = (title && description && content && category);

        if (availabelData) {
            startAddBlog({ title, description, content, category }).then((result) => {
                if (result.message !== "Blog Created") {
                    setError(result.message);
                } else {
                    setError('');
                    history.push('/');
                }
            });
        } else {
            setError('Fill out all fields And Select a Category!');
        }
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
                    <option disabled selected value=''>--Select Category--</option>
                    {
                        categories.map((category) => <option value={category}>{category}</option>)
                    }
                </select>
                <button>Create Blog</button>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    startAddBlog: (blog) => dispatch(startAddBlog(blog)),
});

export default connect(undefined, mapDispatchToProps)(NewBlog);

//fetch('/data/new_blog', {
//    method: 'POST',
//    body: JSON.stringify({
//        title,
//        description,
//        content,
//        category
//    })
//})
//.then(res => res.json())
//.then(result => {
//    //console.log(result);
//    if (result.message !== "Blog Created") {
//        setError(result.message);
//    } else {
//        setError('');
//        history.push('/');
//    }
//})
//.catch(er => console.log(er));