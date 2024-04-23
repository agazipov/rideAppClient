import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../../redux/authSlice";

import "./nav.css"

const PAGINATION = [
    {
        path: "/admin",
        title: "Календарь",
    },
    {
        path: "/admin/users",
        title: "Пассажиры",
    },
]

export default function Nav() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // выход из сессии активен только при добавлении токена в сторейдж **
    const handleExit = () => {
        localStorage.clear();
        dispatch(clearCredentials());
        navigate("/");
    };

    return (
        <div className="navigation">
            <Breadcrumb>
                {PAGINATION.map((page) => (
                    <Breadcrumb.Item
                        key={page.path}
                        linkAs={NavLink}
                        linkProps={{ to: page.path }}
                        active={page.path === location.pathname}
                    >
                        {page.title}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
            <div>
                <Button onClick={handleExit}>Выйти</Button>
            </div>
        </div>
    )
}