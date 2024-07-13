import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../auth/Auth";
import AdminPage from "../admin/Admin";
import { PrivateOutlet } from "../outlet/Outlet";
import ProviderWrapper from "../../context/ProviderWrapper";
import UsersPage from "../usersPage/UsersPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProviderWrapper />
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
                // path: "calendar",
                index: true,
                element: <AdminPage />,
            },
            {
                path: "users",
                index: true,
                element: <UsersPage />,
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
