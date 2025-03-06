import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "../components/Layout";

jest.mock("../components/Header", () => () => <div data-testid="header">Mock Header</div>);


describe("Layout Component", () => {
  it("should render the Header component", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});