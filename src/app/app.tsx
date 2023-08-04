import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Menu } from '../pages/menu/menu';
import { Login } from '../components/login/login';
import { Singup } from '../components/signup/signup';
import { Reset } from '../components/reset/reset';
import { Auth } from '../pages/auth/auth';
import { Home } from '../components/home/home';
import { Favorite } from '../components/favorite/favorite';
import { FlatDetail } from '../components/foodDetail/foodDetail';
import { Profile } from '../components/profile/profile';
import { Forgot } from '../components/forgot/forgot';
import { store } from '../store/slices/store';
import { Advertising } from '../components/advertising/advertising';
import { About } from '../components/about/about';
import { AdModal } from '../components/adModal/AdModal';

const persistor = persistStore(store);

export const App = () => (
    <div className="app">
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
                    <Router>
                        <Routes>
                            <Route path="/" element={<Auth />}>
                                <Route path="/" element={<Login />} />
                                <Route path="/signup" element={<Singup />} />
                            </Route>
                            <Route path="/" element={<Menu />}>
                                <Route path="/home" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/favorite" element={<Favorite />} />
                                <Route path="/advertising" element={<Advertising />} />
                                <Route path="/profile" element={<Profile />}/>
                            </Route>
                            
                            <Route path="/ad-modal" element={<AdModal />} />
                            <Route path="/modal" element={<FlatDetail />} />
                            <Route path="/forgot" element={<Forgot />} />
                            <Route path="/reset-password/:token" element={<Reset />} />
                        </Routes>
                    </Router>
            {/* </PersistGate> */}
        </Provider>
    </div>
);
