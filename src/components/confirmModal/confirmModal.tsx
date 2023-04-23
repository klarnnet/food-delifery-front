import { io } from 'socket.io-client';
import { historyApi } from '../../store/services/historyService';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { userApi } from '../../store/services/userService';
import { CartContext } from '../../store/services/cartContext';
import { paymentApi } from '../../store/services/paymentService';
import './confirmModal.scss';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

const ConfirmModal = () => {
    const { cart, resetCart } = useContext(CartContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('');
    const totalQty = cart.reduce((acc, item) => acc + item.coast, 0);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (totalQty === 0) return;
        if (paymentStatus !== 'succeeded') return;
        resetCart();
    });

    const [setUserCart, { data }] = paymentApi.useSetUserCartMutation();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (totalQty === 0) return;
        if (!stripe || !elements) return;
        const cardEl = elements.getElement(CardElement);
        setIsProcessing(true);
        try {
            const { client_secret: clientSecret } = await setUserCart({ cart }).unwrap();
            const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardEl!,
                },
            });

            if (!paymentIntent) {
                setPaymentStatus('Payment failed!');
            } else {
                setPaymentStatus(paymentIntent.status);
            }
        } catch (error) {
            console.error(error);
            setPaymentStatus('Payment failed!');
        }

        setIsProcessing(false);
    };
    const { data: user } = userApi.useGetUserQuery({});
    const { data: historyData, refetch } = historyApi.useGetHistoryQuery('');
    const [addHistory] = historyApi.useAddHistoryMutation();
    const [changeStatusHistory] = historyApi.useChangeStatusHistoryMutation();
    const [adress, setAdress] = useState('');
    const handleGetRandomCourier = async () => {
        if (historyData && historyData.find((i: any) => i.status === 'in progress')) {
            alert('you have already ordered');
        } else {
            const socket = io('http://localhost:4000');

            socket.emit('Notification', user.id);

            socket.on('Notification', async data => {
                console.log(data.delay);
                addHistory({ couierId: data.courier.id, adress: adress, time: data.delay });
                toast('your order is one-brand and will be ready in'+data.delay,{position: toast.POSITION.BOTTOM_CENTER,autoClose:500})
            });

            socket.on('DelayedNotification', async data => {
                console.log(data);
                changeStatusHistory('');
                toast(data,{position: toast.POSITION.BOTTOM_CENTER,autoClose:500})
            });
        }
    };
    return (
        <div className='paymentModal'>
            <form onSubmit={handleSubmit} className='paymentModal__form' id="payment-form">
                <label htmlFor="card-element">Indicate the card</label>
                <CardElement className="card" id="card-element" />
                <div className="input-blok">
                    <div className="input-blok__text">Enter shipping address</div>
                    <input
                        className="input-blok__input"
                        type="text"
                        value={adress}
                        onChange={e => setAdress(e.target.value)}
                    />
                </div>
                {!isProcessing && (
                    <div className="confitmOrder">
                        <button onClick={handleGetRandomCourier} className="confitmOrder__title">
                            Pay
                        </button>
                    </div>
                )}
                {isProcessing && <div>Processing...</div>}
                {!isProcessing && paymentStatus && <div>Status: {paymentStatus}</div>}
            </form>
        </div>
    );
};

const PaymentGateway = () => {
    const stripePromise = loadStripe(
        'pk_test_51MzgNxHujxX9WSR7QAf7Eiz6BrpMXA3YYHVJMvzPyRqZqVFHmgafnyomZQCqzyY4SMgUoyTz6T5lKuYrh396TiGe00z9eYUYV8',
    );

    return (
        <Elements stripe={stripePromise}>
            <ConfirmModal />
        </Elements>
    );
};

export default PaymentGateway;
