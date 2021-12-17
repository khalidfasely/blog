import React from 'react';
import { render } from "@testing-library/react";
import blogs from '../fixtures/blogs';
import { BlogsList } from '../../components/BlogsList';
jest.mock('../../components/BlogItem', () => () => 'BlogItem');

test('Should render BlogsList with blogs', () => {
    const { asFragment  } = render(<BlogsList blogs={blogs} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render BlogsList with searchFilter', () => {
    const { asFragment  } = render(<BlogsList blogs={blogs} searchFilter={'title2'} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render BlogsList with empty array', () => {
    const { asFragment  } = render(<BlogsList blogs={[]} />);
    expect(asFragment()).toMatchSnapshot();
});