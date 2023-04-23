import './favorite.scss';
import Like from '../../shared/assets/ic_favorite_selected.svg';

import { favoriteApi } from '../../store/services/favoriteService';
import { MouseEvent, useContext, useState } from 'react';
import Filter from '../../shared/assets/filter.svg';
import type { ISetFavoriteFood } from '../../store/types/IFavorite';
import { CartContext } from '../../store/services/cartContext';
import type { IFood } from '../../store/types/IFood';
import { Advertising } from '../advertising/advertising';
import { Link } from 'react-router-dom';
import { userApi } from '../../store/services/userService'; 

export const Favorite = () => {
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [search, setSearch] = useState<string>('');
    const [deleteFavoriteFood] = favoriteApi.useDeleteFavoriteFoodMutation();
    let { data: favoriteData} = favoriteApi.useGetFavoriteFoodQuery({ filter: selectedFilter, search: search });
    favoriteData = favoriteData?.map((item: any) => item.__food__);
    const { data:user } = userApi.useGetUserQuery({});

    const filter = [
        'desserts',
        'salads',
        'drink',
        'soups',
        'vegetarian',
        'fast food',
        'salty',
        'spicy',
        'sweet',
        'sour',
    ];
    function setFilter(i: string) {
        if (i === selectedFilter) {
            setSelectedFilter('all');
        } else {
            setSelectedFilter(i);
        }
    }
    const [burger, setBurger] = useState('close');

    function openCloseFilter() {
        if (burger === 'close') {
            setBurger('open');
        } else {
            setBurger('close');
        }
    }
    const { plusToCart } = useContext(CartContext);

    const addFoodToCart=(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, item:IFood)=>{
        e.preventDefault()
        plusToCart(item,1)
    }

    const deleteFavFood = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,i: IFood) =>{
        e.preventDefault()
        deleteFavoriteFood(Number(i.id) as unknown as ISetFavoriteFood)
    }

    return (
        <div className="favorite">
            <div>
                <div className="favorite__header">
                    <div className="favorite__header__left">
                        <div className="text">Let’s eat Favorite food </div>
                        <form>
                            <input
                                className="search-input"
                                type="text"
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search food..."
                            />
                        </form>
                    </div>
                    <div className="favorite__header__right">
                        <div className="f"></div>

                        {user.image?<img  alt = 'avatar' src={'http://localhost:4000/' + user.image} className='avatar'></img>:<div className='avatar'></div>}
                        <button className="btn" onClick={() => openCloseFilter()}>
                            <img alt="btn" src={Filter}></img>
                        </button>
                    </div>
                </div>
                <div className={burger}>
                    {filter.map(i => (
                        <div key={i} onClick={() => setFilter(i)} className={i === selectedFilter ? 'filterClick' : 'blok'}>
                            {i}
                        </div>
                    ))}
                </div>
            </div>

            <Advertising/>

            <div className="favorite__main">
                {favoriteData?.map((i:any) => (
                            <Link className="card" to="/modal" state={{ i: i }}>
                                <div className="card__image">
                                    <img className="image" src={i.image}></img>
                                    <div className="r">
                                        <button className="btn" onClick={(e) => deleteFavFood(e,i)}>
                                            <img className="btn__like" alt="like" src={Like}></img>
                                        </button>
                                    </div>
                                </div>
                                <div className="card__firstname">{i.firstname}</div>
                                <div className="card__lastname">{i.lastname}</div>
                                <div className="card__coast">{i.coast}</div>
                                <div className="card__addToCart">
                                    <button onClick={(e)=>addFoodToCart(e,i)} className="btn">Add to Cart</button>
                                </div>
                            </Link>
                    ),
                )}
            </div>
        </div>
    );
};
