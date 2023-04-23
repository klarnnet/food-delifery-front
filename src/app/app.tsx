import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { Menu } from '../pages/menu/menu';
import { Login } from '../components/login/login';
import { Singup } from '../components/signup/signup';
// import { setupStore } from '../store/slices/store';
import { Reset } from '../components/reset/reset';
import { Auth } from '../pages/auth/auth';
import { Home } from '../components/home/home';
import { Favorite } from '../components/favorite/favorite';
import { Order } from '../components/order/order';
import { FoodDetail } from '../components/foodDetail/foodDetail';
import { Profile } from '../components/profile/profile';
import { Notification } from '../components/notification/notification';
import { Forgot } from '../components/forgot/forgot';
import { store } from '../store/slices/store';
import { Context } from '../store/services/cartContext';
import { Payment } from '../components/payment/payment';
import { Account } from '../components/account/account';
import { History } from '../components/history/history';
import ConfirmModal from '../components/confirmModal/confirmModal';
import { ToastContainer } from 'react-toastify';

const persistor = persistStore(store);

export const App = () => (
    <div className="app">
        <Provider store={store}>
        <ToastContainer  position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover/>
            <PersistGate loading={null} persistor={persistor}>
                <Context>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Auth />}>
                                <Route path="/" element={<Login />} />
                                <Route path="/signup" element={<Singup />} />
                            </Route>
                            <Route path="/" element={<Menu />}>
                                <Route path="/home" element={<Home />} />
                                <Route path="/favorite" element={<Favorite />} />
                                <Route path="/notification" element={<Notification />} />
                                <Route path="/profile" element={<Profile />}>
                                    <Route path="/profile/account" element={<Account />} />
                                    <Route path="/profile/payment" element={<Payment />} />
                                    <Route path="/profile/history" element={<History />} />
                                </Route>
                            </Route>
                            <Route path="/confirm-modal" element={<ConfirmModal />} />
                            <Route path="/order" element={<Order />} />
                            <Route path="/modal" element={<FoodDetail />} />
                            <Route path="/forgot" element={<Forgot />} />
                            <Route path="/reset-password/:token" element={<Reset />} />
                        </Routes>
                    </Router>
                </Context>
            </PersistGate>
        </Provider>
    </div>
);
