import { NavLink, Outlet } from 'react-router-dom';
import './auth.scss';
import Logo from '../../shared/assets/logo.svg';

export const Auth = () => (
    <div className='auth'>
        <div className="auth__blok">
            <div className="auth__blok__nav">
                <NavLink className={({ isActive }) =>
                      isActive
                        ? "active"
                        : "link"
                    }  to="/">
                    Войти
                </NavLink>
                <NavLink className={({ isActive }) =>
                      isActive
                        ? "active"
                        : "link"
                    }  to="/signup">
                    Зарегестрироваться
                </NavLink>
            </div>
        </div>
        <Outlet />
    </div>
);
