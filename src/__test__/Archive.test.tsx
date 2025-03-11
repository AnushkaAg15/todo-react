import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Archive from "../pages/Archive";

const mockStore = configureStore([]);

describe("Archive Component", () => {
  test("renders 'Archived Todos' heading", () => {
    const store = mockStore({
      todos: { todos: [] },
    });

    render(
      <Provider store={store}>
        <Archive />
      </Provider>
    );

    expect(screen.getByText("Archived Todos")).toBeInTheDocument();
  });

  test("displays message when no archived todos", () => {
    const store = mockStore({ todos: { todos: [] } });

    render(
      <Provider store={store}>
        <Archive />
      </Provider>
    );

    expect(screen.getByText("No Completed/Archved Todos")).toBeInTheDocument();
  });

  test("displays archived todos", () => {
    const store = mockStore({
      todos: {
        todos: [
          { id: 1, title: "Test Todo 1", description: "Desc 1", status: "completed", startDate: "2025-03-01" },
          { id: 2, title: "Test Todo 2", description: "Desc 2", status: "archived", startDate: "2025-03-02" },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Archive />
      </Provider>
    );

    expect(screen.getByText("Test Todo 1 (completed)")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2 (archived)")).toBeInTheDocument();
  });

  test("applies correct styles based on status", () => {
    const store = mockStore({
      todos: {
        todos: [
          { id: 1, title: "Test Todo 1", description: "Desc 1", status: "completed", startDate: "2025-03-01" },
          { id: 2, title: "Test Todo 2", description: "Desc 2", status: "archived", startDate: "2025-03-02" },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Archive />
      </Provider>
    );

    const completedTodo = screen.getByText("Test Todo 1 (completed)").parentElement;
    expect(completedTodo).toHaveClass("bg-green-100", "border-green-500");

    const archivedTodo = screen.getByText("Test Todo 2 (archived)").parentElement;
    expect(archivedTodo).toHaveClass("bg-red-100", "border-red-500");
  });

  test("displays todo details correctly", () => {
    const store = mockStore({
      todos: {
        todos: [
          { id: 1, title: "Test Todo 1", description: "Desc 1", status: "completed", startDate: "2025-03-01" },
          { id: 2, title: "Test Todo 2", description: "Desc 2", status: "archived", startDate: "2025-03-02" },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Archive />
      </Provider>
    );

    expect(screen.getByText("Desc 1")).toBeInTheDocument();
    expect(screen.getByText("Start Date: 2025-03-01")).toBeInTheDocument();

    expect(screen.getByText("Desc 2")).toBeInTheDocument();
    expect(screen.getByText("Start Date: 2025-03-02")).toBeInTheDocument();
  });
});
