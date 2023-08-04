import './profile.scss';
import { userApi } from '../../store/services/userService';
import { Account } from '../account/account';

export const Profile = () => {
    const { data: user } = userApi.useGetUserQuery({});

    return (
        <div className="profile">
            <div className="profile__about">
                <div className='img'><img src={'http://localhost:4000/' + user?.image}></img></div>
                <div className='as'>
                    <div className="main__about__name">Имя: {user?.username}</div>
                    <div className="main__about__email">Электронная почта: {user?.email}</div>
                    <div className="main__about__id">Ваш личный ID: {user?.id}</div>
                </div>
            </div>

            <Account />
        </div>
    );
};
