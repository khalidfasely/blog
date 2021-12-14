import React from 'react';
import { shallow } from 'enzyme';
import blogs from '../fixtures/blogs';
import { Blogs } from '../../components/Blogs';

test('Should render Blogs correcly with props', () => {
    const wrapper = shallow(<Blogs blogs={blogs} searchFilter={'title2'} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render Blogs correcly with no props', () => {
    const wrapper = shallow(<Blogs />);
    expect(wrapper).toMatchSnapshot();
});