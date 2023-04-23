import { useContext } from 'react';
import { CartContext } from '../../store/services/cartContext';
import './orderItems.scss';

export const OrderItems = () => {
    const { cart, plusToCart, minusToCart } = useContext(CartContext);

    return (
        
            <div className="orderItems">
                {cart?.map(i => (
                    <div key={i.id} className="item">
                        <div className="item__image">
                            <img className="productImage" alt="productImage" src={i.image}></img>
                        </div>
                        <div className="item__about">
                            <div className="item__about__firstname">{i.firstname}</div>
                            <div className="item__about__lastname">{i.lastname}</div>
                            <div className="item__about__coastCount">
                                <div className="coast">
                                    <div className="coast__usd">$</div>
                                    <div>{i.coast}</div>
                                </div>
                                <div className="count">
                                    <button onClick={() => minusToCart(i)} className="count__min">-</button>
                                    <div className="count__times">{i.count}</div>
                                    <button onClick={() => plusToCart(i,1)} className="count__pl">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
           
    );
};