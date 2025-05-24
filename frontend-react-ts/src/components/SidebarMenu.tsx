//import FC from react
import { type FC } from "react";

//import Link from react router dom
import { Link } from "react-router";
import { useLogout } from "../hooks/auth/useLogout";

const SidebarMenu: FC = () => {
    const logout = useLogout();
    return (
        <div className="card border-0 rounded-0 shadow-sm">
            <div className="card-header">Menu</div>
            <div className="card-body rounded-0">
                <div className="list-group rounded-0">
                    <Link to="/admin/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                    <Link to="/admin/users" className="list-group-item list-group-item-action">Data User</Link>
                    <a href="#" onClick={logout} className="list-group-item list-group-item-action" style={{ cursor: 'pointer' }}>Logout</a>
                </div>
            </div>
        </div>
    );
};

export default SidebarMenu;
