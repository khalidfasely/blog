import React from 'react';
import { shallow } from 'enzyme';
import { SocialShare } from '../../components/SocialShare';

test('Should render SocialShare correctly', () => {
    const wrapper = shallow(<SocialShare shareUrl={'/blog/1'} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render SocialShare with no url', () => {
    const wrapper = shallow(<SocialShare />);
    expect(wrapper).toMatchSnapshot();
});