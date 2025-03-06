import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todoSlice";

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.title.length > 100) newErrors.title = "Max 100 characters";
    if (!formData.startDate) newErrors.startDate = "Start Date is required";
    if (!formData.endDate) newErrors.endDate = "End Date is required";
    if (formData.description.length > 200) newErrors.description = "Max 200 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (!validateForm()) return;
    dispatch(addTodo(formData));
    onClose(); // Close modal after submission
    setFormData({ title: "", description: "", startDate: "", endDate: "" }); // Reset form
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Add New Todo</h2>

        {/* Title */}
        <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-medium">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
        />
        {submitted && errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

        {/* Description */}
        <label htmlFor="description" className="block mt-2 text-gray-700 dark:text-gray-300 font-medium">Description</label>
        <textarea
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description (optional)"
        />
        {submitted && errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

        {/* Start Date */}
        <label htmlFor="startDate" className="block mt-2 text-gray-700 dark:text-gray-300 font-medium">
          Start Date <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          data-testid="start-date-input"
        />
        {submitted && errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}

        {/* End Date */}
        <label htmlFor="endDate" className="block mt-2 text-gray-700 dark:text-gray-300 font-medium">
          End Date <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          data-testid="end-date-input"
        />
        {submitted && errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}

        {/* Buttons */}
        <div className="flex justify-end mt-4">
          <button
            className="mr-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
