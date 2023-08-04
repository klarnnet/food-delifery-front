import { useState } from 'react';
import { userApi } from '../../store/services/userService';
import './changeAbout.scss'

export const ChangeAbout = () => {
    const { data:user } = userApi.useGetUserQuery({});
    const [username, setUsername] = useState(user?.username);
    const [email, setEmail] = useState(user?.email);
    const [setUserAboutChange] = userApi.useSetUserAboutChangeMutation()
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setUserAboutChange({username,email})

    };
    return (
        <div className="changeAbout">
            <form className="changeAbout__form" onSubmit={handleSubmit}>
                <div className="inputBlok">
                    <div className='inputBlok__text'>Имя</div>
                    <input
                    className='inputBlok__input'
                        type="text"
                        value={username} onChange={e => setUsername(e.target.value)}
                    ></input>
                </div>
                <div className="inputBlok">
                    <div className='inputBlok__text'>Электронная почта</div>
                    <input  className='inputBlok__input'
                        type="email"
                        value={email} onChange={e => setEmail(e.target.value)}
                    ></input>
                </div>

                <button className="changeAbout__form__btn" type="submit">
                Сохранить
                </button>
            </form>
        </div>
    );
};