import React, { useState } from 'react';
import { connect } from 'react-redux';
import { filterBySearch } from '../actions/filterBlogs';

export const SearchBlog = ({ searchFilter, filterBySearch }) => {
    const serachValueDefault = searchFilter ? searchFilter : '';
    const [searchValue, setSearchValue] = useState(serachValueDefault);

    const searchValueChange = (e) => {
        const searchValue = e.target.value;
        setSearchValue(searchValue);
    }

    const searchData = (e) => {
        e.preventDefault();
        //To filter with onSubmit
        filterBySearch(searchValue);
    }

    return (
        <div className="search content-container">
            <div className='content-container'>
                <form data-testid='form' className='search__form' onSubmit={searchData}>
                    <input
                        data-testid='search_input'
                        className='search__form_input'
                        type='text'
                        placeholder='Search...'
                        value={searchValue}
                        maxLength={100}
                        onChange={searchValueChange}
                    />
                </form>
                {searchFilter && <p className='search__result'>Result of: <b className='search__resultvalue'>{searchFilter}</b></p>}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    searchFilter: state.filterBlogs.searchValue,
  });

const mapDispatchToProps = (dispatch) => ({
    filterBySearch: (searchValue) => dispatch(filterBySearch(searchValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBlog);

//import React from 'react';
//import { connect } from 'react-redux';
//import { filterBySearch } from '../actions/filterBlogs';
//
//const SearchBlog = ({ searchFilter, filterBySearch }) => {
//
//    const searchValueChange = (e) => {
//        const searchValue = e.target.value.replace(/\s/g, '');
//        //To filter with onChange
//        filterBySearch(searchValue);
//    }
//
//    //const searchData = (e) => {
//    //    e.preventDefault();
//    //    //To filter with onSubmit
//    //    filterBySearch(searchValue.replace(/\s/g, ''));
//    //}
//
//    return (
//        <div>
//            <input
//                type='text'
//                placeholder='Search...'
//                value={searchFilter}
//                onChange={searchValueChange}
//            />
//        </div>
//    )
//};//<input type='month' min='2021-09' onChange={monthValueChange} />
//
//const mapStateToProps = (state) => ({
//    searchFilter: state.filterBlogs.searchValue,
//  });
//
//const mapDispatchToProps = (dispatch) => ({
//    filterBySearch: (searchValue) => dispatch(filterBySearch(searchValue)),
//});
//
//export default connect(mapStateToProps, mapDispatchToProps)(SearchBlog);