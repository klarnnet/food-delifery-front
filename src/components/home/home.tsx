import { FormEvent, JSXElementConstructor, MouseEvent, ReactElement, ReactFragment, ReactPortal, useState } from 'react';
import { flatsApi } from '../../store/services/flatsService';
import './home.scss';
import type { FilterFlatDto, IFlat } from '../../store/types/IFlat';
import { favoriteApi } from '../../store/services/favoriteService';
import { Link } from 'react-router-dom';

export const Home = () => {
    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<any>({
        rooms: '',
        people: '',
        coastmin: 0,
        coastmax: 100000000,
        type: '',
        region: '',
        city: '',
    });
    if (filter.coastmax === 0) {
        setFilter({ ...filter, coastmax: 10000000 });
    }
    const { data } = flatsApi.useGetFlatsQuery({ data: filter, search });
    const rooms = ['', '1', '2', '3', '4', '5', '6', '7'];
    console.log(filter);
    const people = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const type = ['', 'посуточная', 'долгосрочная', 'продажа'];
    const region = [
        '',
        'Центральный',
        'Советский',
        'Партизанский',
        'Ленинский',
        'Октябрьский',
        'Фрунзенский',
        'Московский',
        'Заводской',
        'Первомайский',
        'Минский',
    ];
    const city = [
        '',
        'Минск',
        'Гомель',
        'Витебск',
        'Могилев',
        'Брест',
        'Барановичи',
        'Бобруйск',
        'Борисов',
        'Пинск',
        'Орша',
        'Молодечно',
        'Новополоцк',
        'Лида',
        'Слуцк',
        'Жлобин',
        'Солигорск',
        'Жодино',
        'Речица',
        'Полоцк',
        'Светлогорск',
    ];

    let { data: favoriteData } = favoriteApi.useGetFavoriteFoodQuery('');
    favoriteData = favoriteData?.map((item: any) => item.__flat__);
    const [setFavoriteFood, { isLoading: setFavoriteLoading }] = favoriteApi.useSetFavoriteFoodMutation();
    const [deleteFavoriteFood, { isLoading: deleteFavoriteLoading }] = favoriteApi.useDeleteFavoriteFoodMutation();
    console.log(favoriteData);
    const setOrNot = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, i: any) => {
        e.preventDefault();
        if (setFavoriteLoading || deleteFavoriteLoading) {
            return;
        } else {
            favoriteData?.find((d: any) => d.id === i.id) ? deleteFavoriteFood(i.id) : setFavoriteFood(i.id);
        }
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
        <div className="home">
            <form className="form">
                <input
                    className="form__search-input"
                    type="text"
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Найди квартиру по названию..."
                />
            </form>
            <div className="home__filter">
                <div className="filterItem">
                    <div>Комнаты:</div>
                    <select onChange={e => setFilter({ ...filter, rooms: '' + e.target.value })}>
                        {rooms.map(i => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filterItem">
                    <div>Цена:</div>
                    <input
                        className="coast-input"
                        type="number"
                        placeholder="Мин."
                        onChange={e => setFilter({ ...filter, coastmin: +e.target.value })}
                    />
                    <input
                        className="coast-input"
                        type="number"
                        placeholder="Макс."
                        onChange={e => setFilter({ ...filter, coastmax: +e.target.value })}
                    />
                </div>
                <div className="filterItem">
                    <div>Люди:</div>
                    <select onChange={e => setFilter({ ...filter, people: '' + e.target.value })}>
                        {people.map(i => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filterItem">
                    <div>Тип аренды:</div>
                    <select onChange={e => setFilter({ ...filter, type: e.target.value })}>
                        {type.map(i => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filterItem">
                    <div>Район:</div>
                    <select onChange={e => setFilter({ ...filter, region: e.target.value })}>
                        {region.map(i => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filterItem">
                    <div>Город:</div>
                    <select onChange={e => setFilter({ ...filter, city: e.target.value })}>
                        {city.map(i => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="orderItems">
                {data?.map(
                    (i: {
                        [x: string]: any;
                        about: {
                            [x: string]: any;
                            rooms: any;
                            people: any;
                            name:
                                | string
                                | number
                                | boolean
                                | ReactElement<any, string | JSXElementConstructor<any>>
                                | ReactFragment
                                | ReactPortal
                                | null
                                | undefined;
                        };
                    }) => (
                        <Link className='link' to={'/modal'} state={{ i: i }}>
                            <div className="items">
                            <div className='images'>
                                    <button onClick={e => changePlusImage(e, i.id)}> - </button>
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
                                <button key={i?.id} className="btn" onClick={e => setOrNot(e, i)}>
                                    {favoriteData?.find((d: any) => d?.id === i?.id)
                                        ? 'Убрать'
                                        : 'Добавить в избранное'}
                                    {/* <img
                                    className="btn__like"
                                    alt="like"
                                    src={favoriteData?.find((d: any) => d.id === i.id) ? Like : UnLike}
                                ></img> */}
                                </button>
                            </div>
                        </Link>
                    ),
                )}
            </div>
        </div>
    );
};
