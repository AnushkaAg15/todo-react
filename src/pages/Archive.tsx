import { useSelector } from "react-redux";
import { RootState } from "../store";

const Archive = () => {
  const todos = useSelector((state: RootState) =>
    state.todos.todos.filter((todo) => todo.status !== "pending")
  );

  return (
    <div className="m-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Archived Todos</h2>

      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`p-4 border rounded shadow 
              ${
                todo.status === "completed"
                  ? "bg-green-100 border-green-500 dark:bg-green-900 dark:border-green-400"
                  : "bg-red-100 border-red-500 dark:bg-red-900 dark:border-red-400"
              }`}
          >
            <h3 className="text-lg font-semibold">{todo.title} ({todo.status})</h3>
            <p className="text-gray-700 dark:text-gray-300">{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;
