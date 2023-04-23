import { MouseEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
import Filter from '../../shared/assets/filter.svg';
import { foodApi } from '../../store/services/foodService';
import Like from '../../shared/assets/ic_favorite_selected.svg'
import UnLike from '../../shared/assets/ic_favorite_unselected.svg'
import { favoriteApi } from '../../store/services/favoriteService';
import type { ISetFavoriteFood } from '../../store/types/IFavorite';
import type { IFood } from '../../store/types/IFood';
import { CartContext } from '../../store/services/cartContext';
import { userApi } from '../../store/services/userService';

export const Home = () => {

    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [search, setSearch] = useState<string>('');
    const [burger, setBurger] = useState('close');
    
    //favorite
    let {data:favoriteData} = favoriteApi.useGetFavoriteFoodQuery({ filter: 'all', search: '' });
    favoriteData = favoriteData?.map((item: any) => item.__food__);
    const  [setFavoriteFood, {isLoading: setFavoriteLoading}]  = favoriteApi.useSetFavoriteFoodMutation()
    const  [deleteFavoriteFood, {isLoading: deleteFavoriteLoading}]  = favoriteApi.useDeleteFavoriteFoodMutation()


    const { data } = foodApi.useGetFoodQuery({filter: selectedFilter,search: search});
    

    //add to cart 
    const { plusToCart } = useContext(CartContext);

    const addFoodToCart=(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, item:IFood)=>{
        e.preventDefault()
        plusToCart(item,1)
    }

    
    function openCloseFilter() {
        if (burger === 'close') {
            setBurger('open');
        } else {
            setBurger('close');
        }
    }
    const filter = ['desserts', 'salads', 'drink', 'soups', 'vegetarian', 'fast food', 'salty','spicy', 'sweet','sour'];
    
    function setFilter(i: string) {
        if (i === selectedFilter) {
            setSelectedFilter('all');
        } else {
            setSelectedFilter(i);
        }
    }

    const setOrNot=(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,i: IFood)=>{
        e.preventDefault()
        if(setFavoriteLoading || deleteFavoriteLoading){
            return
        }else{
            favoriteData?.find((d:any) => d.id === i.id) ? deleteFavoriteFood(Number(i.id) as unknown as ISetFavoriteFood )  : setFavoriteFood(Number(i.id) as unknown as ISetFavoriteFood )

        }

    }
    const { data:user } = userApi.useGetUserQuery({});

    return (
        <div className="home">
            <div>
                <div className="home__header">
                    <div className="home__header__left">
                        <div className="text">Let’s eat Quality food </div>
                        <form>
                            <input className="search-input" type="text" onChange={e => setSearch(e.target.value)} placeholder="Search food..." />
                        </form>
                    </div>
                    <div className="home__header__right">
                    
                    {user?.image?<img  alt = 'avatar' src={'http://localhost:4000/' + user.image} className='avatar'></img>:<div className='avatar'></div>}

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

            <div className="home__main">
                {data?.map(i => (
                    <Link className="cards" to="/modal" state={{ i: i }}>
                        <div className="card">
                            <div className="card__image">
                                    <img className='image' src={i.image}></img> 
                                    <div className='r'>
                                        <button  key={i.id} className='btn' onClick={(e)=> setOrNot(e,i)}>
                                            <img className='btn__like' alt='like' src={ favoriteData?.find((d:any) => d.id === i.id) ? Like : UnLike }></img>
                                        </button>
                                    </div>
                            </div>
                            <div className="card__firstname">{i.firstname}</div>
                            <div className="card__lastname">{i.lastname}</div>
                            <div className="card__coast"><div className='usd'>$</div>{i.coast}0</div>
                            <div className="card__addToCart">
                                <button className="btn" 
                                onClick={(e)=>addFoodToCart(e,i)}
                                >Add to Cart</button>
                            </div>
                        </div>
                    </Link>
                ))}
               
            </div>
        </div>
    );
};
