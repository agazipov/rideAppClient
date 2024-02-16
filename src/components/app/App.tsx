// import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../auth/Auth";
import AdminPage from "../admin/Admin";
import { PrivateOutlet } from "../outlet/Outlet";
import MainPage from "../main/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/admin",
    element: <PrivateOutlet />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
