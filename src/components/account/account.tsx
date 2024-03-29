import { useState } from 'react';
import { userApi } from '../../store/services/userService';
import './account.scss'
import { ChangeAbout } from '../changeAbout/changeAbout';
import { ChangePassword } from '../changePassword/changePassword';
import { store } from '../../store/slices/store';
interface FormState {
    image: FileList | null;
}

export const Account = () => {
    const [setUserChange, {}] = userApi.useSetUserChangeMutation({});
    const [formState, setFormState] = useState<FormState>({
        image: null,
    });

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;

        setFormState(prevState => ({
            ...prevState,
            image: files,
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const formData = new FormData();

        if (formState.image) {
            Array.from(formState.image).forEach((image: File) => {
                formData.append('image', image);
            });
        }
        await setUserChange(formData);
        console.log(formData);
    };

    return (
        <div className="account">
            <form className="account__form" onSubmit={handleSubmit}>
                <div className="account__form__file">
                    <label htmlFor='input'>Нажмите для смены картинки</label>
                    <input type="file" name="image" id="input" className='image' onChange={handleFileChange} />
                </div>
                <button className="account__form__btn" type="submit">
                Сохранить
                </button>
            </form>
            <ChangeAbout/>
            <ChangePassword/>
        </div>
    );
};
