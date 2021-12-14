import React from 'react';
import { shallow } from 'enzyme';
import blogs from '../fixtures/blogs';
import { BlogsList } from '../../components/BlogsList';

test('Should render BlogsList with blogs', () => {
    const wrapper = shallow(<BlogsList blogs={blogs} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render BlogsList with searchFilter', () => {
    const wrapper = shallow(<BlogsList blogs={blogs} searchFilter={'title2'} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render BlogsList with empty array', () => {
    const wrapper = shallow(<BlogsList blogs={[]} />);
    expect(wrapper).toMatchSnapshot();
});