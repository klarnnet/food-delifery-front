import './menu.scss';
import Home from '../../shared/assets/home.svg';
import Favorite from '../../shared/assets/book.svg';
import Order from '../../shared/assets/shopping_bag.svg';
import Notification from '../../shared/assets/bell.svg';
import Profile from '../../shared/assets/profile.svg';
import { Outlet, NavLink } from 'react-router-dom';

export const Menu = () => (
    <div className="menu">
        <Outlet />
        <div className="menu__nav">
            <div className="menu__nav__left">
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to="/home">
                    <img alt="home" src={Home}></img>
                </NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to="/favorite">
                    <img alt="favorite" src={Favorite}></img>
                </NavLink>
            </div>
            <div className='menu__nav__center'>
                <div className='v'></div>
            </div>

            <div className="menu__nav__right">
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to="/notification">
                    <img alt="notification" src={Notification}></img>
                </NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to="/profile/account">
                    <img alt="profile" src={Profile}></img>
                </NavLink>
            </div>
        </div>
        <NavLink className="cart" to="/order">
            <img alt="order" src={Order}></img>
        </NavLink>
    </div>
);
