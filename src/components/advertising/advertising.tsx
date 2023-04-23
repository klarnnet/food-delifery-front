import { Link } from 'react-router-dom';
import Art from '../../shared/assets/image_shopping_app.svg';
import './advertising.scss'

export const Advertising = () => {
    return (
        <div className='advertising'> 
            <div className="advertising__main">
                <div>
                    <img alt="image" src={Art}></img>
                </div>
                <div>
                    <div className="free-delivery">Free delivery</div>
                    <div className="data">May 10 - June 21</div>
                    <Link className="link" to={'/order'}>
                        <div className="link__text">Order Now</div>
                    </Link>
                </div>
            </div>
            <div className="advertising__title">
                <div className="text">Your Favorite</div>
                <div className="btn">
                    <Link className="btn__link" to={'/home'}>
                        See more
                    </Link>
                </div>
            </div>
        </div>
    );
};
