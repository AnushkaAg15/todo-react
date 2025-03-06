import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Todo } from "./todoTypes";
import {v4 as uuidV4} from "uuid";

interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: []
}

const todoSlice = createSlice ({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Omit<Todo, "id"| "status">>) => {
            state.todos.push({
                id: uuidV4(),
                status: "pending",
                ...action.payload,
            });
        },
        markComplete: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find ((item) => item.id === action.payload);
            if (todo) todo.status = "completed"
        },
        archiveTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find((item) => item.id === action.payload);
            if(todo) todo.status = "archived"
        }
    }
});

export const { addTodo , markComplete, archiveTodo} = todoSlice.actions;
export default todoSlice.reducer;
