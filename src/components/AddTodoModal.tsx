import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { addTodo } from "../features/todos/todoSlice";

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newErrors: { title?: string; description?: string } = {};

    if (title.length > 100) {
      newErrors.title = "Title cannot exceed 100 characters";
    }

    if (description.length > 200) {
      newErrors.description = "Description cannot exceed 200 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(
      addTodo({
        title,
        description,
        startDate,
        endDate,
      })
    );

    onClose();
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Todo</h2>

        <label className="block mb-2">
          Title
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </label>

        <label className="block mb-2">
          Description
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </label>

        <label className="block mb-2">
          Start Date
          <input
            className="w-full p-2 border rounded"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label className="block mb-2">
          End Date
          <input
            className="w-full p-2 border rounded"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <div className="flex justify-end mt-4">
          <button
            className="mr-2 p-2 bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
