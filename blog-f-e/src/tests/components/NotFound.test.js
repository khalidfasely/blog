import React from "react";
import NotFound from "../../components/NotFound";
import { render } from "@testing-library/react";

test('Should render not found component correctly', () => {
    const { asFragment } = render(<NotFound />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render not found page correctly', () => {
    const { getByTestId } = render(<NotFound />);
    const message = getByTestId("404-message");
    expect(message.textContent).toBe('404 - Not Found Go Home');
});