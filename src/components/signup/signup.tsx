import { FormEvent, useState } from 'react';
import './signup.scss'
import { useNavigate } from 'react-router-dom';
import type { IRegisterRequest } from '../../store/types/IAuth';
import { authApi } from '../../store/services/authService';

export const Singup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [fail, setFail] = useState(false);

    const navigate = useNavigate();

    const [registerUser, {data}] = authApi.useRegisterUserMutation()


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(password===confirm){
        const answer = await registerUser({username, email, password} as IRegisterRequest).unwrap()
        if(!answer){
            navigate('/')
        }
       }else{
        setFail(true)
       }
    }

    return (
        <div className="signup">
            <form className="signup__form" onSubmit={handleSubmit}>
                <div className="input-blok">
                    <div className='input-blok__text'>Username</div>
                    <input className='input-blok__input' type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="input-blok">
                    <div className='input-blok__text'>Email Address</div>
                    <input className='input-blok__input' type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="input-blok">
                    <div className='input-blok__text'>Password</div>
                    <input className='input-blok__input' type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="input-blok">
                    <div className='input-blok__text'>Confirm Password</div>
                    {fail && <div className="repeat-password">Passwords don’t match</div>}
                    <input className='input-blok__input' type="password" value={confirm} onChange={e => setConfirm(e.target.value)}/>
                </div>

                <input className="btn" type="submit" value="Sign up" />
            </form>
        </div>
    );
};
