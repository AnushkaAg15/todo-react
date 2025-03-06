import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddTodoModal from "../components/AddTodoModal";

const mockStore = configureStore([]);

describe("AddTodoModal Component", () => {
  let store: any;
  let onClose: any;

  beforeEach(() => {
    store = mockStore({ todos: [] });
    store.dispatch = jest.fn(); // Mock dispatch function
    onClose = jest.fn(); // Mock onClose function
  });

  test("should not render when isOpen is false", () => {
    render(
      <Provider store={store}>
        <AddTodoModal isOpen={false} onClose={onClose} />
      </Provider>
    );
    expect(screen.queryByText("Add New Todo")).not.toBeInTheDocument();
  });

  test("should render modal when isOpen is true", () => {
    render(
      <Provider store={store}>
        <AddTodoModal isOpen={true} onClose={onClose} />
      </Provider>
    );
    expect(screen.getByText("Add New Todo")).toBeInTheDocument();
  });

  test("should show validation errors when submitting empty form", () => {
    render(
      <Provider store={store}>
        <AddTodoModal isOpen={true} onClose={onClose} />
      </Provider>
    );
    fireEvent.click(screen.getByText("Add Todo"));
    
    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(screen.getByText("Start Date is required")).toBeInTheDocument();
    expect(screen.getByText("End Date is required")).toBeInTheDocument();
  });

  test("should dispatch addTodo action and close modal on valid submit", () => {
    render(
      <Provider store={store}>
        <AddTodoModal isOpen={true} onClose={onClose} />
      </Provider>
    );
    fireEvent.change(screen.getByPlaceholderText("Enter title"), { target: { value: "Test Todo" } });
    fireEvent.change(screen.getByPlaceholderText("Enter description (optional)"), { target: { value: "Test Description" } });
    fireEvent.change(screen.getByTestId("start-date-input") as HTMLInputElement, { target: { value: "2025-03-10" } });
    fireEvent.change(screen.getByTestId("end-date-input") as HTMLInputElement, { target: { value: "2025-03-15" } });
    fireEvent.click(screen.getByText("Add Todo"));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "todos/addTodo",
        payload: {
          title: "Test Todo",
          description: "Test Description",
          startDate: "2025-03-10",
          endDate: "2025-03-15",
        },
      })
    );
    expect(onClose).toHaveBeenCalled();
  });

  test("should reset form after successful submission", () => {
    render(
      <Provider store={store}>
        <AddTodoModal isOpen={true} onClose={onClose} />
      </Provider>
    );
  
    const titleInput = screen.getByPlaceholderText("Enter title") as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: "Test Todo" } });
    fireEvent.change(screen.getByTestId("start-date-input") as HTMLInputElement, { target: { value: "2025-03-10" } });
    fireEvent.change(screen.getByTestId("end-date-input") as HTMLInputElement, { target: { value: "2025-03-15" } });
    fireEvent.click(screen.getByText("Add Todo"));
  
    expect(titleInput.value).toBe(""); 
  });

  test("should call onClose when cancel button is clicked", () => {
    render(
      <Provider store={store}>
        <AddTodoModal isOpen={true} onClose={onClose} />
      </Provider>
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
  });
});
