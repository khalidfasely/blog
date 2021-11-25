import React from 'react';
import { connect } from 'react-redux';
import { filterBySearch } from '../actions/filterBlogs';

const SearchBlog = ({ searchFilter, filterBySearch }) => {

    const searchValueChange = (e) => {
        const searchValue = e.target.value.replace(/\s/g, '');
        //To filter with onChange
        filterBySearch(searchValue);
    }

    //const searchData = (e) => {
    //    e.preventDefault();
    //    //To filter with onSubmit
    //    filterBySearch(searchValue.replace(/\s/g, ''));
    //}

    return (
        <div>
            <input
                type='text'
                placeholder='Search...'
                value={searchFilter}
                onChange={searchValueChange}
            />
        </div>
    )
};//<input type='month' min='2021-09' onChange={monthValueChange} />

const mapStateToProps = (state) => ({
    searchFilter: state.filterBlogs.searchValue,
  });

const mapDispatchToProps = (dispatch) => ({
    filterBySearch: (searchValue) => dispatch(filterBySearch(searchValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBlog);