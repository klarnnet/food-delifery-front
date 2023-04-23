import { useContext, useState } from 'react';
import { CartContext } from '../../store/services/cartContext';
import { ConfirmOrder } from '../confirmOrder/confirmOrder';
import './orderCoast.scss';
import { foodApi } from '../../store/services/foodService';

export const OrderCoast = () => {
    const { cart } = useContext(CartContext);
    
    const [promoCode, setPromoCode] = useState('');
    const [getPromoCode, { data }] = foodApi.useLazyGetPromoCodeQuery();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        getPromoCode({ code: promoCode });
    };
    const percent = data?.map(i=>i.percent)[0]

    return (
        <div className="orderCoast">
            <div className="orderCoast__promo">
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        className="input"
                        type="text"
                        placeholder="Promo code..."
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                    />
                    <button className="promo-btn" type="submit">
                        Apply
                    </button>
                </form>
            </div>
            <div className="orderCoast__total">
                <div className="orderCoast__total__subtotal">
                    <div>Subtotal</div>
                    <div className="subCoast">$ {(cart ? cart.reduce((a, i) => a + i.coast * i.count, 0) : 0 ).toFixed(2)}</div>
                </div>
                <div className="orderCoast__total__delivey">
                    <div>Delivery</div>
                    <div className="free">Free</div>
                </div>
                <div className="orderCoast__total__total">
                    <div className="title">Total</div>
                    <div className="totalCoast">${((cart ? cart.reduce((a, i) => a + i.coast * i.count, 0) : 0)*(percent?percent/100:1)).toFixed(2)}</div>
                </div>
            </div>
            <ConfirmOrder />
        </div>
    );
};

