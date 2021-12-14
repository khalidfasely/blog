import React from "react";
import { shallow } from "enzyme";
import { SavedBlogs } from "../../components/SavedBlogs";
import blogs from '../fixtures/blogs';

test('Should render SavedBlogs correctly with props', () => {
    const wrapper = shallow(<SavedBlogs blogs={blogs} />);
    expect(wrapper.find('p').text()).toBe('saved blogs');
    expect(wrapper).toMatchSnapshot();
});

test('Should render SavedBlogs correctly with no props', () => {
    const wrapper = shallow(<SavedBlogs />);
    expect(wrapper).toMatchSnapshot();
});