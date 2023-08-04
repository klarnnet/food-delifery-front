import { useState } from 'react';
import { userApi } from '../../store/services/userService';
import './changePassword.scss'

export const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [setUserPasswordChange, {}] = userApi.useSetUserPasswordChangeMutation()
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setUserPasswordChange({password,changePassword:newPassword})
    };

    return (
        <div className="changePassword">
            <form className="changePassword__form" onSubmit={handleSubmit}>
                <div className="inputBlok">
                    <div className='inputBlok__text'>Введите действующий пароль</div>
                    <input className='inputBlok__input'
                        type="password"
                        value={password} onChange={e => setPassword(e.target.value)}
                    ></input>
                </div>
                <div className="inputBlok">
                    <div className='inputBlok__text'>Введите новый пароль</div>
                    <input className='inputBlok__input'
                        type="password"
                        value={newPassword} onChange={e => setNewPassword(e.target.value)}
                    ></input>
                </div>
                <button className="changePassword__form__btn" type="submit">
                    Сохранить
                </button>
            </form>
        </div>
    );
};