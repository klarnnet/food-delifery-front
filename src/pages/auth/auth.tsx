import { NavLink, Outlet } from 'react-router-dom';
import './auth.scss';
import Logo from '../../shared/assets/logo.svg';

export const Auth = () => (
    <div className='auth'>
        <div className="auth__blok">
            <div className="auth__blok__header">
                <div className="logo">
                    <img alt="logo" src={Logo}></img>
                </div>
                <div className="name">Corner Food</div>
                <div className="appName">Delivery App</div>
            </div>
            <div className="auth__blok__nav">
                <NavLink className={({ isActive }) =>
                      isActive
                        ? "active"
                        : "link"
                    }  to="/">
                    Login
                </NavLink>
                <NavLink className={({ isActive }) =>
                      isActive
                        ? "active"
                        : "link"
                    }  to="/signup">
                    Signup
                </NavLink>
            </div>
        </div>
        <Outlet />
    </div>
);
