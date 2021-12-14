import React from 'react';
import { shallow } from 'enzyme';
import { MarkdownBlog } from '../../components/MarkdownBlog';
import { blog1 as blog } from '../fixtures/blog';

test('Should render MarkdownBlog correctly with props', () => {
    const wrapper = shallow(<MarkdownBlog blogContent={blog.content} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render MarkdownBlog correctly with no props', () => {
    const wrapper = shallow(<MarkdownBlog />);
    expect(wrapper).toMatchSnapshot();
});