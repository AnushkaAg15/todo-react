import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "../components/Header";
import { MemoryRouter } from "react-router-dom";
const mockStore = configureStore([]);
describe("Header Component", () => {
    it("should render the header with the correct title", () => {
        const store = mockStore({ todos: { todos: [] } });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByText(/📌 Todo App/i)).toBeInTheDocument();
    });
    it("should display the correct count for pending and archived todos", () => {
        const store = mockStore({
            todos: {
                todos: [
                    { id: "1", title: "Task 1", status: "pending" },
                    { id: "2", title: "Task 2", status: "completed" },
                    { id: "3", title: "Task 3", status: "archived" },
                ],
            },
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByText(/Pending \(1\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Archive \(2\)/i)).toBeInTheDocument();
    });
    it("should contain a link to the Pending and Archive pages", () => {
        const store = mockStore({ todos: { todos: [] } });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByRole("link", { name: /Pending \(0\)/i })).toHaveAttribute("href", "/");
        expect(screen.getByRole("link", { name: /Archive \(0\)/i })).toHaveAttribute("href", "/archive");
    });
    it("should render the ThemeToggle component", () => {
        const store = mockStore({ todos: { todos: [] } });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByRole("button")).toBeInTheDocument(); // Assuming ThemeToggle is a button
    });
});
