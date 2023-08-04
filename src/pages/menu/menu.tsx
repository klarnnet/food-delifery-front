import './menu.scss';
import Home from '../../shared/assets/home.svg';
import Favorite from '../../shared/assets/book.svg';
import Order from '../../shared/assets/shopping_bag.svg';
import Notification from '../../shared/assets/bell.svg';
import Profile from '../../shared/assets/profile.svg';
import { Outlet, NavLink } from 'react-router-dom';

export const Menu = () => (
    <div className="menu">
        <div className="menu__nav">
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to="/home">
                <div>Главная</div>
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to="/favorite">
                <div>Избранное</div>
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to="/advertising">
                <div>Мои обьявления</div>
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to="/profile">
                <div>Профиль</div>
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to="/about">
                <div>О нас</div>
            </NavLink>
        </div>
        <Outlet />
    </div>
);
