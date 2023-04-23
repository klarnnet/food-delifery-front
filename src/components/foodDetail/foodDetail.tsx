import { useLocation } from 'react-router-dom';
import './foodDetail.scss';
import Star from '../../shared/assets/start.svg';
import Time from '../../shared/assets/time.svg';
import Like from '../../shared/assets/ic_favorite_selected.svg';
import UnLike from '../../shared/assets/ic_favorite_unselected.svg';
import { favoriteApi } from '../../store/services/favoriteService';
import { MouseEvent, useContext, useState } from 'react';
import type { IFood } from '../../store/types/IFood';
import type { ISetFavoriteFood } from '../../store/types/IFavorite';
import { CartContext } from '../../store/services/cartContext';
 
export const FoodDetail = () => {
    const { state: { i } = {} } = useLocation();
    const { cart, plusToCart } = useContext(CartContext);
    const [setFavoriteFood] = favoriteApi.useSetFavoriteFoodMutation();
    const [deleteFavoriteFood] = favoriteApi.useDeleteFavoriteFoodMutation();
    const { data: favoriteData } = favoriteApi.useGetFavoriteFoodQuery({ filter: 'all', search: '' });
    const [count, setCount] = useState<number>(1)


    const setOrNot = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, i: IFood) => {
        e.preventDefault();
        food?.find((d: { id: string | undefined }) => d.id === i.id)
            ? deleteFavoriteFood(Number(i.id) as unknown as ISetFavoriteFood)
            : setFavoriteFood(Number(i.id) as unknown as ISetFavoriteFood);
    };


    if (favoriteData) {
        const resData = JSON.parse(JSON.stringify(favoriteData));
        var food = resData.map((i: { __food__: any }) => i.__food__);
    }

    
    return (
        <div className="foodDetail">
            <div className="foodDetail__header">
                <div className="image">
                    <img className="img" src={i.image}></img>
                    <div className="r">
                        <button key={i.id} className="btn" onClick={e => setOrNot(e, i)}>
                            <img
                                className="btn__like"
                                alt="like"
                                src={food?.find((d: { id: string | undefined }) => d.id === i.id) ? Like : UnLike}
                            ></img>
                        </button>
                    </div>
                </div>
            </div>
            <div className="foodDetail__main">
                <div className="foodDetail__main__header">
                    <div className="name">
                        <div className="name__first">{i.firstname}</div>
                        <div className="name__second">{i.lastname}</div>
                    </div>
                    <div className="coast">{i.coast}</div>
                </div>
                <div className="foodDetail__main__info">
                    <div className="stars">
                        <img alt="start" src={Star}></img>
                        <div>{i.stars}</div>
                    </div>
                    <div className="time">
                        <img alt="time" src={Time}></img>
                        <div>{i.time}</div>
                    </div>
                </div>
                <div className="foodDetail__main__about">
                    <div className="head">About</div>
                    <div className="title">{i.about}</div>
                </div>
                <div className="foodDetail__main__cart">
                    <div className="count">
                        <button onClick={() => count===0?setCount(0):setCount(count - 1)} className="count__min">-</button>
                        <div className="count__times">{count}</div>
                        <button onClick={() => setCount(count + 1)} className="count__pl">+</button>
                    </div>
                    <button className='btn' onClick={() => plusToCart(i,count)}> ADD TO CART </button>
                </div>
            </div>
        </div>
    );
};
