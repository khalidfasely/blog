import React from 'react';
import { render } from "@testing-library/react";
import { SocialShare } from '../../components/SocialShare';

test('Should render SocialShare correctly', () => {
    const { asFragment } = render(<SocialShare shareUrl={'/blog/1'} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render SocialShare with no url', () => {
    const { asFragment } = render(<SocialShare />);
    expect(asFragment()).toMatchSnapshot();
});