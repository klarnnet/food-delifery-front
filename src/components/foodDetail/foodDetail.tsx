import { useLocation } from 'react-router-dom';
import './foodDetail.scss';
import { FormEvent, useState } from 'react';

export const FlatDetail = () => {
    const { state: { i } = {} } = useLocation();
    const [number, setNumber] = useState<number>(1);

    const changePlusImage = async (e: FormEvent) => {
        e.preventDefault();
        if (number >= 3) {
            setNumber(1);
        } else {
            setNumber(number + 1);
        }
        console.log(number);
    };
    const changeMinuseImage = async (e: FormEvent) => {
        e.preventDefault();
        if (number <= 1) {
            setNumber(3);
        } else {
            setNumber(number - 1);
        }
        console.log(number);
    };
    return (
        <div className="flatDetail">
            <div className="images">
                <button className="btn" onClick={changePlusImage}>
                    +
                </button>
                <div className="img">
                    <img
                        src={`http://localhost:4000/${
                            number === 1 ? i.about.image1 : number === 2 ? i.about.image2 : i.about.image3
                        }`}
                    ></img>
                </div>
                <button className="btn" onClick={changeMinuseImage}>
                    -
                </button>
            </div>
            <div className="aboutFlat">
                <div className="name">
                    <div>{i.about.name}</div>
                </div>

                <div className="about">
                    <div>Описание:</div>
                    <div>{i.about.description}</div>
                </div>
            </div>

            <div className="detail">
                <div>
                    <div className="about">
                        <img className="logos" src={require('../../images/logos/type.png')}></img>
                        <div>Количество комнат:</div>
                        <div>{i.about.rooms}</div>
                    </div>
                    <div className="about">
                        <img className="logos" src={require('../../images/logos/price-tag.png')}></img>
                        <div>Цена:</div>
                        <div>{i.about.coast} p.</div>
                    </div>
                    <div className="about">
                        <img className="logos" src={require('../../images/logos/multiple-users-silhouette.png')}></img>
                        <div>Допустимое количество людей</div>
                        <div>{i.about.people}</div>
                    </div>

                    <div className="about">
                        <img className="logos" src={require('../../images/logos/clock.png')}></img>
                        <div>Тип:</div>
                        <div>{i.about.type} </div>
                    </div>
                </div>
                <div>
                    <div className="about">
                        <img className="logos" src={require('../../images/logos//skyline.png')}></img>
                        <div>Город:</div>
                        <div>{i.location.city}</div>
                    </div>
                    <div className="about">
                        <img className="logos" src={require('../../images/logos/location.png')}></img>
                        <div>Адрес:</div>
                        <div>{i.location.adress}</div>
                    </div>
                    <div className="about">
                        <img className="logos" src={require('../../images/logos/moscow-metro-logo.png')}></img>
                        <div>Метро:</div>
                        <div>{i.location.metro}</div>
                    </div>
                    <div className="about">
                        <img className="logos" src={require('../../images/logos//area-with-pins.png')}></img>
                        <div>Район</div>
                        <div>{i.location.region}</div>
                    </div>
                </div>
                <div>
                    <div className="about">
                        <img className="logos" src={require('../../images/logos//phone-call.png')}></img>
                        <div>Номер телефона для связи:</div>
                        <div>{i.about.phone}</div>
                    </div>
                    <div className="about">
                        <img className="logos" src={require('../../images/logos/user.png')}></img>
                        <div>Имя арендадателя/продавца:</div>
                        <div>{i.location.username}</div>
                    </div>
                    <div className="about">
                        <img className="logos" src={require('../../images/logos//gmail.png')}></img>
                        <div>Электронная почта арендадателя/продавца:</div>
                        <div>{i.location.usergmail}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
