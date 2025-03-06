import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../store';
import { markComplete, archiveTodo } from '../features/todos/todoSlice';
import { useState } from 'react';
import AddTodoModal from '../components/AddTodoModal';

const PendingTodos = ()  => {
    const todos = useSelector((state: RootState) => state.todos.todos.filter(todo => todo.status === "pending"));
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const today = new Date().toISOString().split("T")[0];

  return (
    <div className="m-4 p-4">
  
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-bold">Pending Todos</h2>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
      onClick={() => setIsModalOpen(true)}
    >
      Add Todo
    </button>
  </div>
   
  {todos.length === 0 && <p className='text-center text-2xl'>No pending todos</p>}
  
  <AddTodoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />


  <div className="space-y-4">
    {todos.map((todo) => (
      <div key={todo.id} className={`border p-4 mb-2 rounded shadow ${todo.endDate < today ? "bg-red-100 dark:bg-red-800" : ""}`}>
        <h3 className="text-lg font-semibold">📌 {todo.title}</h3>
        <p className="text-gray-700 dark:text-gray-400">{todo.description}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300"> Start Date: {todo.startDate}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
            Due: {todo.endDate} {todo.endDate < today ? "🔥 Overdue!" : ""}
        </p>
        <div className="mt-2 space-x-2">
          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            onClick={() => dispatch(markComplete(todo.id))}
          >
            Complete
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            onClick={() => dispatch(archiveTodo(todo.id))}
          >
            Archive
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  )
}

export default PendingTodos
