import React from 'react';
import { Link } from 'react-router-dom';
import MarkdownBlog from './MarkdownBlog';

export const BlogPageItems = ({ blog, isPreview }) => {
    return (
        <div>
            {
                blog && (
                    <div>
                        <h1 data-testid='title_item' >{blog.title}</h1>
                        <p data-testid='time_item' >{blog.created_at}</p>
                        <p data-testid='user_item' >{blog.created_by.username}</p>
                        <p data-testid='category_item' >{blog.category}</p>
                        <p data-testid='description_item' >{blog.description}</p>
                        <MarkdownBlog blogContent={blog.content} />
                        {
                            isPreview &&
                            <Link data-testid='blog_link' to={`/blog/${blog.id}`}>
                                See More
                            </Link>
                        }
                        <p data-testid='likes_item' >{blog.likes}</p>
                        <p data-testid='dislikes_item' >{blog.dislikes}</p>
                    </div>
                )
            }
        </div>
    )
};

export default BlogPageItems;