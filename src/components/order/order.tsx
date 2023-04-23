import { Link } from 'react-router-dom';
import './order.scss';
import Close from '../../shared/assets/close.svg';
import { OrderItems } from '../orderItems/orderItems';
import { OrderCoast } from '../orderCoast/orderCoast';


export const Order = () => {

    return (
        <div className="order">
            <div className="order__header">
                <div className="title">My Order</div>
                <Link to={'/home'} className="out">
                    <img className="out__img" alt="close" src={Close}></img>
                </Link>
            </div>
            <OrderItems/>
            <OrderCoast/>
        </div>
    );
};
