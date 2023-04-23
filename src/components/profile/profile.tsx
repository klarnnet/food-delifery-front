import { Outlet } from 'react-router-dom';
import "./profile.scss"
import { ProfileNav } from '../profileNav/profileNav';
import { userApi } from '../../store/services/userService';

export const Profile = () => {

    const { data:user } = userApi.useGetUserQuery({});
    return (
        <div className="profile">
            <div className="profile__blok">
                <div className="profile__blok__header">
                    <div className="title">My Profile</div>
                    <div className='main'>
                        {user.image?<img  alt = 'avatar' src={'http://localhost:4000/' + user.image}className='main__avatar'></img>:<div className='main__avatar'></div>}
                        
                        <div className='main__about'>
                            <div className='main__about__name'>{user?.username}</div>
                            <div className='main__about__email'>{user?.email}</div>
                            <div className='main__about__id'>User ID: {user?.id}</div>
                        </div>
                    </div>
                </div>
                <ProfileNav/>
            </div>
            <Outlet />
        </div>
    );
};
