import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../../store/services/authService';
import type { IResetRequest } from '../../store/types/IAuth';
import './reset.scss'

export function Reset() {
    const [password, setPassword] = useState('');
    const [changePassword, { data }] = authApi.useChangePasswordMutation();
    const navigate = useNavigate();
    const { state: { resetLink } = '' } = useLocation();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const token = resetLink.link.slice(37)
        const reset = await changePassword({ password, token } as IResetRequest).unwrap();
        if(!reset){
          navigate('/');
        }
    };

    return (
        <div className='reset'>
            <form className='reset__form' onSubmit={handleSubmit}>
                <label className="password">
                    <div className="title">Enter a new password</div>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button className='btn' type="submit">Send reset password</button>
            </form>
        </div>
    );
}
