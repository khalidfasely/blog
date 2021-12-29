import React from 'react';
import { Link } from 'react-router-dom';
import MarkdownBlog from './MarkdownBlog';

export const BlogPageItems = ({ blog, isPreview }) => {
    return (
        <div className='blog-items__container'>
            {
                blog && (
                    <div className='blog-items'>
                        <div className='solid-border-bottom'>
                            <p className='blog-items__category' data-testid='category_item' >{blog.category}</p>
                            <h3 className='blog-items__title' data-testid='title_item' >{blog.title}</h3>
                            <div className='blog-items__user'>
                                <Link to={`/user/${blog.created_by.id}`}>
                                    <p className='blog-items__username' data-testid='user_item' >
                                        {blog.created_by.username}
                                    </p>
                                </Link>
                                <p className='blog-items__time' data-testid='time_item' >{blog.created_at}</p>
                            </div>
                            <p className='blog-items__description' data-testid='description_item' >{blog.description}</p>
                        </div>
                        <MarkdownBlog blogContent={blog.content} />
                        {
                            isPreview &&
                            <div className='blog-items__link-page'>
                                <Link data-testid='blog_link' to={`/blog/${blog.id}`}>
                                    Read More
                                </Link>
                            </div>
                        }
                        <p className='blog-items__likes' data-testid='likes_item' ><span>{blog.likes}</span> People(s) like this Blog</p>
                    </div>
                )
            }
        </div>
    )
};//<p data-testid='dislikes_item' >{blog.dislikes}</p>

export default BlogPageItems;