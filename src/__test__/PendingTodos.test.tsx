import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PendingTodos from "../pages/PendingTodos";
import { markComplete, archiveTodo } from "../features/todos/todoSlice";

const mockStore = configureStore([]);

jest.mock("../features/todos/todoSlice", () => ({
  markComplete: jest.fn(),
  archiveTodo: jest.fn(),
}));

describe("PendingTodos Component", () => {
  test("renders 'Pending Todos' heading", () => {
    const store = mockStore({ todos: { todos: [] } });

    render(
      <Provider store={store}>
        <PendingTodos />
      </Provider>
    );

    expect(screen.getByText("Pending Todos")).toBeInTheDocument();
  });

  test("displays message when no pending todos", () => {
    const store = mockStore({ todos: { todos: [] } });

    render(
      <Provider store={store}>
        <PendingTodos />
      </Provider>
    );

    expect(screen.getByText("No pending todos")).toBeInTheDocument();
  });

  test("displays pending todos", () => {
    const store = mockStore({
      todos: {
        todos: [
          { id: 1, title: "Todo 1", description: "Desc 1", status: "pending", startDate: "2025-03-01", endDate: "2025-03-10" },
          { id: 2, title: "Todo 2", description: "Desc 2", status: "pending", startDate: "2025-03-02", endDate: "2025-02-28" }, // Overdue
        ],
      },
    });

    render(
      <Provider store={store}>
        <PendingTodos />
      </Provider>
    );

    expect(screen.getByText("📌 Todo 1")).toBeInTheDocument();
    expect(screen.getByText("📌 Todo 2")).toBeInTheDocument();
  });

  test("applies overdue styling for past due todos", () => {
    const store = mockStore({
      todos: {
        todos: [
          { id: 2, title: "Todo 2", description: "Desc 2", status: "pending", startDate: "2025-03-02", endDate: "2025-02-28" }, // Overdue
        ],
      },
    });

    render(
      <Provider store={store}>
        <PendingTodos />
      </Provider>
    );

    const overdueTodo = screen.getByText("📌 Todo 2").parentElement;
    expect(overdueTodo).toHaveClass("bg-red-100", "dark:bg-red-800");
  });

  test("dispatches 'markComplete' when 'Complete' button is clicked", () => {
    const store = mockStore({
      todos: {
        todos: [{ id: 1, title: "Todo 1", description: "Desc 1", status: "pending", startDate: "2025-03-01", endDate: "2025-03-10" }],
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <PendingTodos />
      </Provider>
    );

    const completeButton = screen.getByText("Complete");
    fireEvent.click(completeButton);

    expect(store.dispatch).toHaveBeenCalledWith(markComplete('1'));
  });

  test("dispatches 'archiveTodo' when 'Archive' button is clicked", () => {
    const store = mockStore({
      todos: {
        todos: [{ id: 1, title: "Todo 1", description: "Desc 1", status: "pending", startDate: "2025-03-01", endDate: "2025-03-10" }],
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <PendingTodos />
      </Provider>
    );

    const archiveButton = screen.getByText("Archive");
    fireEvent.click(archiveButton);

    expect(store.dispatch).toHaveBeenCalledWith(archiveTodo('1'));
  });

  test("opens and closes the Add Todo Modal", () => {
    const store = mockStore({ todos: { todos: [] } });
  
    render(
      <Provider store={store}>
        <PendingTodos />
      </Provider>
    );
  
    const addButton = screen.getByText("Add Todo");
    fireEvent.click(addButton);
  
    // Debug to check what's rendering
    screen.debug();
  
    // Look for a unique element inside the modal (adjust selector as needed)
    expect(screen.getByText("Add New Todo")).toBeInTheDocument(); // Adjust text if necessary
  
    // Close modal
    const closeButton = screen.getByText("Cancel");
    fireEvent.click(closeButton);
  
    // Ensure modal is closed
    expect(screen.queryByText("Add New Todo")).not.toBeInTheDocument();
  
  });
});
