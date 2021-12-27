import React from "react";
import { fireEvent, render } from '@testing-library/react';
import { user1 } from '../fixtures/user';
import { blog1 } from '../fixtures/blog';
import { NewBlog } from "../../components/NewBlog";

let props;

beforeEach(() => {
    props = {
        uname: 'UserAdmin',
        profileList: [user1],
        isEdit: false,
        blog: undefined,
        edit: jest.fn(),
        savedBlogs: ['1'],
        categories: ['Web', 'Programming', 'React']
    }
});

test('Should render NewBlog(mode: new blog) component correctly', () => {
    const { asFragment, getByTestId } = render(<NewBlog {...props} />);
    expect(asFragment()).toMatchSnapshot();

    const titleInputEl = getByTestId('title_input');
    expect(titleInputEl.value).toBe('');

    const descriptionInputEl = getByTestId('description_input');
    expect(descriptionInputEl.value).toBe('');

    const contentInputEl = getByTestId('content_input');
    expect(contentInputEl.value).toBe('');

    const categorySelectEl = getByTestId('category_select');
    expect(categorySelectEl.value).toBe('');

    const buttonEl = getByTestId('edit_create_button');
    expect(buttonEl.textContent).toBe('Create Blog');
});

test('Should render NewBlog(mode: editing) component correctly', () => {
    const { asFragment, getByTestId } = render(<NewBlog {...{...props, isEdit: true, blog: blog1}} />);
    expect(asFragment()).toMatchSnapshot();

    const titleInputEl = getByTestId('title_input');
    expect(titleInputEl.value).toBe(blog1.title);

    const descriptionInputEl = getByTestId('description_input');
    expect(descriptionInputEl.value).toBe(blog1.description);

    const contentInputEl = getByTestId('content_input');
    expect(contentInputEl.value).toBe(blog1.content);

    const categorySelectEl = getByTestId('category_select');
    expect(categorySelectEl.value).toBe(blog1.category);

    const buttonEl = getByTestId('edit_create_button');
    expect(buttonEl.textContent).toBe('Edit Blog');
});

test('Should change inputs on NewBlog(mode: new blog) work correctly', () => {
    const { getByTestId } = render(<NewBlog {...props} />);

    const titleInputEl = getByTestId('title_input');
    fireEvent.change(titleInputEl, {
        target: {
            value: 'title'
        }
    });
    expect(titleInputEl.value).toBe('title');

    const descriptionInputEl = getByTestId('description_input');
    fireEvent.change(descriptionInputEl, {
        target: {
            value: 'description'
        }
    });
    expect(descriptionInputEl.value).toBe('description');

    const contentInputEl = getByTestId('content_input');
    fireEvent.change(contentInputEl, {
        target: {
            value: 'content'
        }
    });
    expect(contentInputEl.value).toBe('content');

    const categorySelectEl = getByTestId('category_select');
    fireEvent.change(categorySelectEl, {
        target: {
            value: 'Web'
        }
    });
    expect(categorySelectEl.value).toBe('Web');
});

test('Should change inputs on NewBlog(mode: editing) work correctly', () => {
    const { getByTestId } = render(<NewBlog {...{...props, isEdit: true, blog: blog1}} />);

    const titleInputEl = getByTestId('title_input');
    fireEvent.change(titleInputEl, {
        target: {
            value: 'edited title'
        }
    });
    expect(titleInputEl.value).toBe('edited title');

    const descriptionInputEl = getByTestId('description_input');
    fireEvent.change(descriptionInputEl, {
        target: {
            value: 'edited description'
        }
    });
    expect(descriptionInputEl.value).toBe('edited description');

    const contentInputEl = getByTestId('content_input');
    fireEvent.change(contentInputEl, {
        target: {
            value: 'edited content'
        }
    });
    expect(contentInputEl.value).toBe('edited content');

    const categorySelectEl = getByTestId('category_select');
    fireEvent.change(categorySelectEl, {
        target: {
            value: 'React'
        }
    });
    expect(categorySelectEl.value).toBe('React');
});

test('Should fire onsubmit on NewBlog(mode: new blog) with errors correctly', () => {
    const { getByTestId } = render(<NewBlog {...props} />);
    const formEl = getByTestId('form');

    const titleInputEl = getByTestId('title_input');
    fireEvent.change(titleInputEl, {
        target: {
            value: 'title'
        }
    });
    //fireEvent.change(titleInputEl, {
        //    target: {
    //        value: '12345678910 12345678910 12345678910 12345678910 12345678910 12345678910 12345678910 12345678910 12345678910'
    //    }
    //});
    //fireEvent.submit(formEl);
    //expect(getByText('The title\'s length should be 90 or more.')).not.toBeInTheDocument();
    
    const descriptionInputEl = getByTestId('description_input');
    fireEvent.change(descriptionInputEl, {
        target: {
            value: 'description'
        }
    });
    
    const contentInputEl = getByTestId('content_input');
    fireEvent.change(contentInputEl, {
        target: {
            value: 'content'
        }
    });
    
    const categorySelectEl = getByTestId('category_select');
    fireEvent.change(categorySelectEl, {
        target: {
            value: ''
        }
    });
    fireEvent.submit(formEl);
    
    const errorTitleEl = getByTestId('title_error');
    expect(errorTitleEl.textContent).toBe('The title\'s length should be 90 or more.');
    
    const errorDescriptionEl = getByTestId('description_error');
    expect(errorDescriptionEl.textContent).toBe('The description\'s length should be 200 or more.');
    
    const errorContentEl = getByTestId('content_error');
    expect(errorContentEl.textContent).toBe('The content\'s length should be 500 or more.');
    
    const errorCategoryEl = getByTestId('category_error');
    expect(errorCategoryEl.textContent).toBe('Set a category to the Blog.');
});

test('Should fire onsubmit on NewBlog(mode: editing) with errors correctly', () => {
    const { getByTestId } = render(<NewBlog {...{...props, isEdit: true, blog: blog1}} />);
    const formEl = getByTestId('form');

    const titleInputEl = getByTestId('title_input');
    fireEvent.change(titleInputEl, {
        target: {
            value: 'title'
        }
    });
    
    const descriptionInputEl = getByTestId('description_input');
    fireEvent.change(descriptionInputEl, {
        target: {
            value: 'description'
        }
    });
    
    const contentInputEl = getByTestId('content_input');
    fireEvent.change(contentInputEl, {
        target: {
            value: 'content'
        }
    });
    
    const categorySelectEl = getByTestId('category_select');
    fireEvent.change(categorySelectEl, {
        target: {
            value: ''
        }
    });

    fireEvent.submit(formEl);

    const errorTitleEl = getByTestId('title_error');
    expect(errorTitleEl.textContent).toBe('The title\'s length should be 90 or more.');

    const errorDescriptionEl = getByTestId('description_error');
    expect(errorDescriptionEl.textContent).toBe('The description\'s length should be 200 or more.');

    const errorContentEl = getByTestId('content_error');
    expect(errorContentEl.textContent).toBe('The content\'s length should be 500 or more.');

    const errorCategoryEl = getByTestId('category_error');
    expect(errorCategoryEl.textContent).toBe('Set a category to the Blog.');
});

test('Should edit() call correctly', () => {
    const { getByTestId } = render(<NewBlog {...{...props, isEdit: true, blog: blog1}} />);

    const buttonEditEl = getByTestId('edit_create_button');
    expect(buttonEditEl.textContent).toBe('Edit Blog');

    expect(props.edit).toHaveBeenCalledTimes(0);
    fireEvent.click(buttonEditEl);
    //Because the data is not available(availableData === false)
    expect(props.edit).toHaveBeenCalledTimes(0);
});