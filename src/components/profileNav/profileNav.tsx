import { NavLink } from 'react-router-dom';
import "./profileNav.scss"

export const ProfileNav = () => {
    return (
                <div className="profileNav">
                    <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to="/profile/account">
                        Account
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to="/profile/payment">
                        Payment
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to="/profile/history">
                        History
                    </NavLink>
                </div>
    ); 
};
