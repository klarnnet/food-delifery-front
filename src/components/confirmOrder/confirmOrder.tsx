import './confirmOrder.scss';
import { Link } from 'react-router-dom';

export const ConfirmOrder = () => {

    return (
        <div className="confitmOrder">
            <Link className="confitmOrder__title" to='/confirm-modal'>
            <button >
                CONFIRM ORDER
            </button>
            </Link>
        </div>
    );
};
