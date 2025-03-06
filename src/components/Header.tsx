import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Header = () => {
    const archiveTodos = useSelector((state: RootState) => state.todos.todos.filter((todo) => todo.status !== "pending"));
    const pendingTodos = useSelector((state: RootState) => state.todos.todos.filter((todo) => todo.status === "pending"));
  return (
    <header className="flex flex-wrap items-center justify-between bg-blue-500 dark:bg-gray-600 text-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">📌 Todo App</h1>
        <nav className="flex items-center gap-4">
            <Link to="/" className="mx-2 hover:underline">Pending ({pendingTodos.length})</Link>
            <Link to="/archive" className="mx-2 hover:underline">Archive ({archiveTodos.length})</Link>
            <ThemeToggle />
        </nav>
    </header>
  )
}

export default Header
