import React from 'react';
import { SearchBlog } from '../../components/SearchBlog';
import { render, fireEvent } from '@testing-library/react';

test('Should render SearchBlog component correctly', () => {
    const { asFragment } = render(<SearchBlog />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render SearchBlog component with search value filter correctly', () => {
    const { asFragment } = render(<SearchBlog searchFilter={'React'} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should change search input(started with empty string) value', () => {
    const { getByTestId } = render(<SearchBlog />);
    const searchInputEl = getByTestId('search_input');

    fireEvent.change(searchInputEl, {
        target: {
            value: 'Javascript'
        }
    });

    expect(searchInputEl.value).toBe('Javascript');

    fireEvent.change(searchInputEl, {
        target: {
            value: 'Jest'
        }
    });

    expect(searchInputEl.value).toBe('Jest');
});

test('Should change search input(started with string) value', () => {
    const { getByTestId } = render(<SearchBlog searchFilter={'React'} />);
    const searchInputEl = getByTestId('search_input');

    expect(searchInputEl.value).toBe('React');

    fireEvent.change(searchInputEl, {
        target: {
            value: 'Javascript'
        }
    });

    expect(searchInputEl.value).toBe('Javascript');
});

test('Should submit form fire correctly', () => {
    const filterBySearch = jest.fn();

    const { getByTestId } = render(<SearchBlog searchFilter={'Python'} filterBySearch={filterBySearch} />)

    const formEl = getByTestId('form');
    const searchInputEl = getByTestId('search_input');

    fireEvent.submit(formEl);

    fireEvent.change(searchInputEl, {
        target: {
            value: ''
        }
    });

    fireEvent.submit(formEl);

    expect(filterBySearch).toHaveBeenCalledTimes(2);
});