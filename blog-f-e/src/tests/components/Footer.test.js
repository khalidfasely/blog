import React from "react";
import Footer from "../../components/Footer";
import { render } from "@testing-library/react";

test('Should render Footer component correctly', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
});