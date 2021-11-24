import React, { useState } from 'react';
import { connect } from 'react-redux';
import { filterBySearch } from '../actions/filterBlogs';

const SearchBlog = ({ filterBySearch }) => {
    const [ searchValue, setSearchValue ] = useState('');

    const searchValueChange = (e) => {
        const searchValue = e.target.value;
        setSearchValue(searchValue);
        //To filter with onChange
        filterBySearch(searchValue.replace(/\s/g, ''));
    }

    const monthValueChange = (e) => {
        console.log(e.target.value.substring(0, 4), e.target.value);
    }

    //const searchData = (e) => {
    //    e.preventDefault();
    //    //To filter with onSubmit
    //    filterBySearch(searchValue.replace(/\s/g, ''));
    //}

    return (
        <form>
            <input
                type='text'
                placeholder='Search...'
                value={searchValue}
                onChange={searchValueChange}
            />
            <input type='month' min='2021-09' onChange={monthValueChange} />
            <button>&#128269; &#128270;</button>
        </form>
    )
};

const mapDispatchToProps = (dispatch) => ({
    filterBySearch: (searchValue) => dispatch(filterBySearch(searchValue)),
});

export default connect(undefined, mapDispatchToProps)(SearchBlog);