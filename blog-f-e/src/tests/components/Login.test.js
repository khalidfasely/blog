import React from "react";
import { shallow } from "enzyme";
import { Login } from "../../components/Login";

test('Should render Login component correctly', () => {
    const wrapper = shallow(<Login startLogin={() => {}} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render error on Login component if onsubmittion without data', () => {
    const wrapper = shallow(<Login startLogin={() => {}} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper).toMatchSnapshot();
});