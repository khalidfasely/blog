import React from "react";
import { render } from '@testing-library/react';
import { UserPage } from "../../components/UserPage";
import { user1 } from "../fixtures/user";
jest.mock('../../components/ModalEditProfile', () => () => 'ModalEditProfile');
jest.mock('../../components/BlogItem', () => () => 'BlogItem');

let props;

beforeEach(() => {
    props = {
        profileList: [user1],
        match: {
            params: {
                uid: 1
            }
        },
        startSetUserPage: jest.fn(),
        uname: 'User'
    }
});

test('Should render UserPage component correctly', () => {
    const { asFragment } = render(<UserPage {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render UserPage component correctly if uname === userPage(username)', () => {
    const { asFragment } = render(<UserPage {...{...props, uname: 'UserAdmin'}} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render UserPage component correctly without bio', () => {
    const { asFragment } = render(<UserPage {...{...props, profileList: [{...user1, bio: ''}]}} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render all element correctly', () => {
    const { getByTestId } = render(<UserPage {...props} />);

    const joinDateEl = getByTestId('join_date');
    expect(joinDateEl.textContent).toBe(`joined on: ${props.profileList[0].uinfo.join_date}`);

    const userBioEl = getByTestId('user_bio');
    expect(userBioEl.textContent).toBe(`bio: ${props.profileList[0].bio}`);
});

test('Should render all element correctly if uname === userPage(username)', () => {
    const { getByTestId } = render(<UserPage {...{...props, uname: 'UserAdmin'}} />);

    const joinDateEl = getByTestId('join_date');
    expect(joinDateEl.textContent).toBe(`joined on: ${props.profileList[0].uinfo.join_date}`);

    const userBioEl = getByTestId('user_bio');
    expect(userBioEl.textContent).toBe(`bio: ${props.profileList[0].bio}`);

    const editProfileButtonEl = getByTestId('edit_profile_button');
    expect(editProfileButtonEl.textContent).toBe('Edit Profile');
});