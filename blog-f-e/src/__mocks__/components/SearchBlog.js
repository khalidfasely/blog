//function SearchBlog({ children }){
//    return <>{children}</>;
//  }
//  
//  export default SearchBlog;

export default jest.mock('../../components/SearchBlog', () => () => 'SearchBlog');
