import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import Categories from "./pages/Categories/Categories";
import CategoryDetails from "./pages/Categories/CategoryDetails";
import CategoriesEdit from "./pages/Categories/CategoryEdit";
import CategoryNew from "./pages/Categories/CategoryNew";
import Programs from "./pages/Programs/programs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/categories", element: <Categories /> },
      { path: "/category/:id", element: <CategoryDetails /> },
      { path: "/category/:id/edit", element: <CategoriesEdit /> },
      { path: "/category/new", element: <CategoryNew /> },
      { path: "/programs", element: <Programs /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
