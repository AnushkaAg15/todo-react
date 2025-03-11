import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import PendingTodos from "../pages/PendingTodos";
// import Archive from "../pages/Archive";
import { lazy, Suspense } from "react";

const Archive = lazy(() => import("../pages/Archive"));

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
        element: <Suspense fallback={<h1>Loading...</h1>}><Archive/></Suspense>,
      },
    ],
  },
]);
