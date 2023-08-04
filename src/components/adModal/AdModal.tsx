import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { flatsApi } from '../../store/services/flatsService';
import './AdModal.scss';
import { userApi } from '../../store/services/userService';

interface FormState {
    image1: FileList | null;
    image2: FileList | null;
    image3: FileList | null;
    rooms: string;
    description: string;
    people: string;
    coast: string;
    type: string;
    adress: string;
    phone: string;
    metro: string;
    region: string;
    city: string;
    name: string;
    username: string;
    usergmail: string;
}

export const AdModal = () => {
    const { data: user } = userApi.useGetUserQuery({});

    const navigate = useNavigate();
    const [addflat] = flatsApi.useAddflatMutation();

    const [formState, setFormState] = useState<FormState>({
        image1: null,
        image2: null,
        image3: null,
        rooms: '',
        description: '',
        people: '',
        coast: '',
        type: '',
        adress: '',
        phone: '',
        metro: '',
        region: '',
        city: '',
        name: '',
        username: user?.username,
        usergmail: user?.email,
    });

    const handleFile1Change = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;

        setFormState(prevState => ({
            ...prevState,
            image1: files,
        }));
    };
    //2
    const handleFile2Change = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;

        setFormState(prevState => ({
            ...prevState,
            image2: files,
        }));
    };
    //3

    const handleFile3Change = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;

        setFormState(prevState => ({
            ...prevState,
            image3: files,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('rooms', formState.rooms);
        formData.append('description', formState.description);
        formData.append('people', formState.people);
        formData.append('coast', formState.coast);
        formData.append('adress', formState.adress);
        formData.append('phone', formState.phone);
        formData.append('type', formState.type);
        formData.append('metro', formState.metro);
        formData.append('region', formState.region);
        formData.append('city', formState.city);
        formData.append('name', formState.name);
        formData.append('username', formState.username);
        formData.append('usergmail', formState.usergmail);

        if (formState.image1) {
            Array.from(formState.image1).forEach((image1: File) => {
                formData.append('image1', image1);
            });
        }
        if (formState.image2) {
            Array.from(formState.image2).forEach((image2: File) => {
                formData.append('image2', image2);
            });
        }
        if (formState.image3) {
            Array.from(formState.image3).forEach((image3: File) => {
                formData.append('image3', image3);
            });
        }

        console.log(
            formData.forEach((value, key) => {
                console.log(key, value);
            }),
        );
        const answer = await addflat(formData).unwrap();
        if (!answer) {
            navigate('/advertising');
        }
    };

    return (
        <div className="adModal">
            <form className="adModal__form" onSubmit={handleSubmit}>
                <div className='add'>
                    <div className="add__file">
                        <label htmlFor="input1">{formState.image1===null?'Добавьте изображение':'Добавленно'}</label>
                        <input type="file" name="image1" id="input1" className="image" onChange={handleFile1Change} />
                    </div>

                    <div className="add__file">
                        <label htmlFor="input2">{formState.image2===null?'Добавьте изображение':'Добавленно'}</label>
                        <input type="file" name="image2" id="input2" className="image" onChange={handleFile2Change} />
                    </div>

                    <div className="add__file">
                        <label htmlFor="input3">{formState.image3===null?'Добавьте изображение':'Добавленно'}</label>
                        <input type="file" name="image3" id="input3" className="image" onChange={handleFile3Change} />
                    </div>
                </div>

                <div className="inputBlok">
                    <div className="inputBlok__text">Количесто комнат</div>
                    <input
                        className="inputBlok__input"
                        type="number"
                        name="rooms"
                        value={formState.rooms}
                        onChange={e => setFormState({ ...formState, rooms: e.target.value })}
                        // onChange={e => setRooms(e.target.value)}
                        required
                    ></input>
                </div>
                <div className="inputBlok">
                    <div className="inputBlok__text">Дайте подробное описание вашей квартире</div>
                    <textarea
                        className="inputBlok__input"
                        // type="text"
                        name="description"
                        value={formState.description}
                        onChange={e => setFormState({ ...formState, description: e.target.value })}
                        required
                    ></textarea>
                </div>
                <div className="inputBlok">
                    <div className="inputBlok__text">Количество человек</div>
                    <input
                        className="inputBlok__input"
                        type="number"
                        name="people"
                        // name="description"

                        value={formState.people}
                        // onChange={handleInputChange}

                        onChange={e => setFormState({ ...formState, people: e.target.value })}
                        required
                    ></input>
                </div>
                <div className="inputBlok">
                    <div className="inputBlok__text">Цена</div>
                    <input
                        className="inputBlok__input"
                        type="number"
                        name="coast"
                        value={formState.coast}
                        onChange={e => setFormState({ ...formState, coast: e.target.value })}
                        required
                    ></input>
                </div>
                <div className="inputBlok">
                    <div className="inputBlok__text">Тип аренды</div>
                    <input
                        className="inputBlok__input"
                        type="text"
                        name="type"
                        value={formState.type}
                        onChange={e => setFormState({ ...formState, type: e.target.value })}
                        required
                    ></input>
                </div>
                <div className="inputBlok">
                    <div className="inputBlok__text">Адрес</div>
                    <input
                        className="inputBlok__input"
                        type="text"
                        name="adress"
                        value={formState.adress}
                        onChange={e => setFormState({ ...formState, adress: e.target.value })}
                        required
                    ></input>
                </div>
                <div className="inputBlok">
                    <div className="inputBlok__text">Станция метро</div>
                    <input
                        className="inputBlok__input"
                        type="text"
                        name="metro"
                        value={formState.metro}
                        onChange={e => setFormState({ ...formState, metro: e.target.value })}
                        required
                    ></input>
                </div>
                <div className="inputBlok">
                    <div className="inputBlok__text">Район города</div>
                    <input
                        className="inputBlok__input"
                        type="text"
                        name="region"
                        value={formState.region}
                        onChange={e => setFormState({ ...formState, region: e.target.value })}
                        required
                    ></input>
                </div>
                <div className="inputBlok">
                    <div className="inputBlok__text">Город</div>
                    <input
                        className="inputBlok__input"
                        type="text"
                        name="city"
                        value={formState.city}
                        onChange={e => setFormState({ ...formState, city: e.target.value })}
                        required
                    ></input>
                </div>

                <div className="inputBlok">
                    <div className="inputBlok__text">Введите номер телефона для связи</div>
                    <input
                        className="inputBlok__input"
                        type="text"
                        name="phone"
                        value={formState.phone}
                        onChange={e => setFormState({ ...formState, phone: e.target.value })}
                        required
                    ></input>
                </div>

                <div className="inputBlok">
                    <div className="inputBlok__text">Дайте название вашей квартире</div>
                    <input
                        className="inputBlok__input"
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                        required
                    ></input>
                </div>

                <input className="btn" type="submit" value="Опубликовать" />
            </form>
        </div>
    );
};
