import { useEffect, useState } from "react"
import api from "../../utils/api.js";
import Card from "../Card/Card.js";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    //States
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    //Get card and user info function
    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()])
            .then(([infoUser, infoCards]) => {
                setUserName(infoUser.name);
                setUserDescription(infoUser.about);
                setUserAvatar(infoUser.avatar)
                infoCards.forEach(element => {
                    element.userId = infoUser._id;
                })
                setCards(infoCards);
            })
            .catch(error => {
                console.error(`Ошибка запроса данных с сервера ${error}`)
            })
    }, [])

    return (
        <main className="content">
            {/*Section PROFILE*/}
            <section className="profile" aria-label="Профиль автора">
                <div className="profile__description">
                    <button
                        type="button"
                        className="profile__button-avatar"
                        aria-label="Изменить автар автора"
                        onClick={onEditAvatar}>
                        <img src={userAvatar} alt="Аватар профиля" className="profile__avatar" />
                    </button>
                    <div className="profile__info">
                        <div className="profile__info-list">
                            <h1 className="profile__info-author" >{userName}</h1>
                            <button
                                type="button"
                                className="profile__button-edit"
                                aria-label="Редактировать профиль"
                                onClick={onEditProfile}
                            />
                        </div>
                        <p className="profile__info-description">{userDescription}</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="profile__button-add"
                    aria-label="Добавить публикацию"
                    onClick={onAddPlace}
                />
            </section>

            {/*Section ELEMENTS*/}
            <section className="elements" aria-label="Карточки с местами">
                {cards.map(data => {
                    return (
                        <li key={data._id} >
                            <Card card={data} onCardClick={onCardClick} />
                        </li>
                    )
                })}
            </section>
        </main>
    )
}