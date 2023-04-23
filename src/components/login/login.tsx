import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { authApi } from '../../store/services/authService';
import type { ILoginRequest } from '../../store/types/IAuth';
import { useAppDispatch } from '../../store/slices/store';
import { setUser } from '../../store/slices/reducers/authSlice';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, {}] = authApi.useLoginUserMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const token = await loginUser({ email, password } as ILoginRequest).unwrap();

        if (token) {
            dispatch(setUser(token.accessToken as string));
            navigate('/home');
        }
    };
    return (
        <div className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <div className="input-blok">
                    <div className="input-blok__text">Email Address</div>
                    <input
                        className="input-blok__input"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-blok">
                    <div className="input-blok__text">Password</div>
                    <input
                        className="input-blok__input"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <Link className="forgot" to="/forgot">
                    forgot password
                </Link>
                <input className="btn" type="submit" value="Sign In" />
            </form>
        </div>
    );
};
