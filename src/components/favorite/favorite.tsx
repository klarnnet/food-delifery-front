import { Link } from 'react-router-dom';
import { favoriteApi } from '../../store/services/favoriteService';
import './favorite.scss';
import { FormEvent, useState } from 'react';

export const Favorite = () => {
    const [deleteFavoriteFood] = favoriteApi.useDeleteFavoriteFoodMutation();

    let { data: favoriteData } = favoriteApi.useGetFavoriteFoodQuery('');
    favoriteData = favoriteData?.map((item: any) => item.__flat__);

    const deleteFavFood = (e: any, i: any) => {
        e.preventDefault();
        deleteFavoriteFood(i.id);
    };

    const [numbers, setNumbers] = useState<{ [key: string]: number[] }>({});

    const changePlusImage = async (e: FormEvent, id: string) => {
        e.preventDefault();
        setNumbers(prevState => ({
          ...prevState,
          [id]: prevState[id] ? [(prevState[id][0] % 3) + 1] : [1]
        }));
      };
      
      const changeMinuseImage = async (e: FormEvent, id: string) => {
        e.preventDefault();
        setNumbers(prevState => ({
          ...prevState,
          [id]: prevState[id] ? [((prevState[id][0] - 2+3)% 3) +1] : [3]
        }));
      };

    return (
        <div className="favorite">
            <div className="orderItems">
                {favoriteData?.map((i: any) => (
                    <Link className="link" to={'/modal'} state={{ i: i }}>
                        <div className="item">
                            <div className="items">
                            <div className='images'>
                                    <button onClick={e => changePlusImage(e, i.id)}>-</button>
                                    <div className='img'><img src={`http://localhost:4000/${i.about[`image${numbers[i.id]?.[0] || 1}`]}`} alt={`Image ${numbers[i.id]?.[0] || 1}`}></img></div>
                                    <button onClick={e => changeMinuseImage(e, i.id)}>+</button>
                                </div>
                                <div className="name">
                                    <div>{i.about.name}</div>
                                </div>
                                <div className="about">
                                    <div>Количество комнат:</div>
                                    <div>{i.about.rooms}</div>
                                </div>
                                <div className="about">
                                    <div>Цена:</div>
                                    <div>{i.about.coast} p.</div>
                                </div>
                                <div className="about">
                                    <div>Допустимое количество людей</div>
                                    <div>{i.about.people}</div>
                                </div>
                                <div className="about">
                                    <div>Город:</div>
                                    <div>{i.location.city}</div>
                                </div>
                                <div className="about">
                                    <div>Адрес:</div>
                                    <div>{i.location.adress}</div>
                                </div>
                                <div className="about">
                                    <div>Метро:</div>
                                    <div>{i.location.metro}</div>
                                </div>
                                <div className="about">
                                    <div>Район</div>
                                    <div>{i.location.region}</div>
                                </div>
                                <button className="btn" onClick={e => deleteFavFood(e, i)}>
                                    Убрать
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
