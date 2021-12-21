import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ModalPreview } from '../../components/ModalPreview';
jest.mock('../../components/BlogPage', () => () => 'BlogPage');

let props;

beforeEach(() => {
    props = {
        pModalOpen: true,
        setPModalOpen: jest.fn(),
        bid: 12
    };
});

test('Should render ModalPreview component correctly', () => {
    const { asFragment } = render(<ModalPreview {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render/fire close button correctly', () => {
    const { getByTestId } = render(<ModalPreview {...props} />);
    const closeButtonEl = getByTestId('close_button');
    expect(closeButtonEl.textContent).toBe('X');

    expect(props.setPModalOpen).toHaveBeenCalledTimes(0);

    fireEvent.click(closeButtonEl);

    expect(props.setPModalOpen).toHaveBeenCalledTimes(1);
});