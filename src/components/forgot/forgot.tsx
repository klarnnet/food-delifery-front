import { FormEvent, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { authApi } from '../../store/services/authService';
import type { IForgotRequest } from '../../store/types/IAuth';
import './forgot.scss'

export function Forgot() {
    const [resetLink, setResetLink] = useState('');

    const [fogotPassword, data ] = authApi.useForgotPasswordMutation();
    const [email, setEmail] = useState('');
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const link = await fogotPassword({ email } as IForgotRequest).unwrap();
        setResetLink(link)
   
    };
    return (
        <div className='forgot'>
            <form className='forgot__form' onSubmit={handleSubmit}>
                <label className='email'>
                   <div className='title'>Enter your email to reset password</div> 
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <button className='btn' type="submit">Send email</button>
                <div>
                    {resetLink ? (
                        <Link className='reset-link' to="/reset-password/:token" state={{ resetLink: resetLink }}>
                            reset link
                        </Link>
                    ) : (
                        ''
                    )}
                </div>
            </form>
        </div>
    );
}
