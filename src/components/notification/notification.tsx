import './notification.scss';
import Phone from '../../shared/assets/call.svg';
import Map from '../../shared/assets/map.svg';
import Time from '../../shared/assets/time.svg';
import { historyApi } from '../../store/services/historyService';
import { useAppDispatch } from '../../store/slices/store';
import { useState } from 'react';
export const Notification = () => {

    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState<string>('');
  
    const { data, refetch } = historyApi.useGetHistoryQuery('');
    
    const setItemCourier=(i: string) => {
      if (i === selected) {
        setSelected('');
      } else {
        setSelected(i);
      }
    };
  
    return (
        <div className="notification">
            <div className="notification__header">Notification</div>
            {data?.map((item: any) => (
                <div className="notification__items">
                    <div className="notification__items__main">
                        <div className="notification__items__main__about">
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
                        <button className="notification__items__main__phone"  key={item} onClick={() => setItemCourier(item)} >
                            
                        {item === selected && item.status==='in progress' ? <div className='notification__items__main__phone__number'>{item.__courier__.phone}</div> : ''}
                            
                            <img alt="phone" src={Phone}></img>
                        </button>
                    </div>
                    <div className="notification__items__footer">
                        <div className="notification__items__footer__left">
                            <div className="image">
                                <img alt="clock" src={Time}></img>
                            </div>
                            <div className="title">
                                <div className="title__about">Your Delivery Time</div>
                                <div className="title__time">{item.time} minutes</div>
                            </div>
                        </div>
                        <div className="notification__items__footer__right">
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
