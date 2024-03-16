import { NavLink, useLocation } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

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

    return (
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
    )
}