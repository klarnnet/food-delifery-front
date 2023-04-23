import { userApi } from "../../store/services/userService";
import Google from '../../shared/assets/google.svg'
import Master from '../../shared/assets/master-card.svg'
import Paypal from '../../shared/assets/paypal.svg'
import Plus from '../../shared/assets/Group 79.svg'
import Amazon from '../../shared/assets/PinClipart 1.svg'
import './payment.scss'


export const Payment = () => {

    const { data:user } = userApi.useGetUserQuery({});
    
    return (
        <div className="payment">
            <div className="payment__title">My Card</div>
            <div className="payment__card">
                <div className="payment__card__item">
                    <div className="amazon"><img alt='amazon' src={Amazon}></img></div>
                    <div className="username">{user?.username}</div>
                    <div className="creditCard">{user?.creditCard? user?.creditCard:''}</div>
                    <div className="about">
                        <div className="about__money">$3.464.98</div>
                        <div className="about__card">
                            <div><img alt="master" src={Master}></img></div>
                            <div className="about__card__text">Platinum Card</div>
                        </div>
                    </div>
                </div>
                <button className="payment__card__plus">
                    <img alt="plus" src={Plus}></img>
                </button>
            </div>
            <div className="payment__title">Payment Method</div>
            <div className="payment__method">
                <div className="payment__method__card">
                    <div className="master">
                        <div className="master__image">
                            <img className="master__image__img" alt="master" src={Master}></img>
                            <label htmlFor="master" className="text">Credit Card</label>
                        </div>
                        <input type="radio" id="master" name="drone" value="master"></input>
                    </div>

                    <div className="paypal">
                        <div className="paypal__image">
                            <img alt="paypal" src={Paypal}></img>
                            <label htmlFor="paypal" className="text">Paypal</label>
                        </div>
                        <input type="radio" id="paypal" name="drone" value="paypal"></input>
                    </div>

                    <div className="goodle">
                        <div className="goodle__image">
                            <img alt="goodle" src={Google}></img>
                            <label htmlFor="goodle" className="text">Google Pay</label>
                        </div>
                        <input type="radio" id="goodle" name="drone" value="goodle"></input>
                    </div>
                </div>
                <div className="payment__card__plus">
                    <img alt="plus" src={Plus}></img>
                </div>
            </div>
        </div>
    );
};
