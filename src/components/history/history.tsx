import { historyApi } from "../../store/services/historyService";
import Map from '../../shared/assets/map.svg';
import Time from '../../shared/assets/time.svg';
import './history.scss'

export const History = () => {
    const { data } = historyApi.useGetHistoryQuery('');

    return (
        <div className="history">
            <div className="history__header">History</div>
            {data?.map((item: any) => (
                <div className="history__items">
                    <div className="history__items__main">
                        <div className="history__items__main__about">
                            <div className="image">
                                <img alt="image" src={item.__courier__.image}></img>
                            </div>
                            <div className="aboutCourier">
                                <div className="aboutCourier__name">{item.__courier__.name}</div>
                                <div className="aboutCourier__id">
                                    ID: {item.__courier__.id?.toString().slice(0, 8)}
                                </div>
                                <div className="aboutCourier__profession">Food courier</div>
                            </div>
                        </div>
                       <div></div>
                    </div>
                    <div className="history__items__footer">
                        <div className="history__items__footer__left">
                            <div className="image">
                                <img alt="clock" src={Time}></img>
                            </div>
                            <div className="title">
                                <div className="title__about">Your Delivery Time</div>
                                <div className="title__time">{item.time}</div>
                            </div>
                        </div>
                        <div className="history__items__footer__right">
                            <div className="image">
                                <img alt="location" src={Map}></img>
                            </div>
                            <div className="title">
                                <div className="title__about">Your Delivery Adress</div>
                                <div className="title__location">{item.adress}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};