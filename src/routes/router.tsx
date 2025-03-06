import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout"; // Ensure correct path
import PendingTodos from "../pages/PendingTodos";
import Archive from "../pages/Archive";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, 
        element: <PendingTodos />,
      },
      {
        path: "archive",
        element: <Archive />,
      },
    ],
  },
]);
