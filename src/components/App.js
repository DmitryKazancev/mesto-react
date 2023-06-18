import Header from "./Header/Header.js";
import Main from './Main/Main.js';
import Footer from "./Footer/Footer.js";
import PopupWithForm from "./PopupWithForms/PopupWithForm.js";
import ImagePopup from "./ImagePopup/ImagePopup.js";
import { useState } from "react";

function App() {

  //States
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  
  //Click to avatar button function
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //Click to edit profile button function
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //Click to card add button function
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //Close all popup windows function
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  //Click to image and open popup with image function
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <>
      <div className="page">
        {/*Section HEADER*/}
        <Header />

        {/*main content*/}
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        
        {/*Section FOOTER  */}
        <Footer />

        {/*Popups sections  */}
        <PopupWithForm name='edit-author' title='Редактировать профиль' textButton='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input
            id="name-author"
            type="text"
            placeholder="Имя автора"
            className="popup__input popup__input_type_name"
            name="nameInput"
            minLength={2}
            maxLength={40}
            required=""
          />
          <span
            id="name-author-error"
            className="popup__error popup__error_field_first"
          />
          <input
            id="about-author"
            type="text"
            placeholder="Об авторе"
            className="popup__input popup__input_type_job"
            name="jobInput"
            minLength={2}
            maxLength={200}
            required=""
          />
          <span
            id="about-author-error"
            className="popup__error popup__error_field_second"
          />
        </PopupWithForm>

        <PopupWithForm name='add-card' title='Новое место' textButton='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input
            id="name-card"
            type="text"
            placeholder="Название"
            className="popup__input popup__input_card_name"
            name="cardName"
            minLength={2}
            maxLength={20}
            required=""
          />
          <span
            id="name-card-error"
            className="popup__error popup__error_field_first"
          />
          <input
            id="link-card"
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_card_url"
            name="link"
            required=""
          />
          <span
            id="link-card-error"
            className="popup__error popup__error_field_second"
          />
        </PopupWithForm>

        <PopupWithForm name='update-avatar' title='Обновить аватар' textButton='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input
            id="link-avatar"
            type="url"
            placeholder="Введите ссылку на аватар"
            className="popup__input popup__input_avatar_url"
            name="linkAvatar"
            required=""
          />
          <span
            id="link-avatar-error"
            className="popup__error popup__error_field_third"
          />
        </PopupWithForm>

        <PopupWithForm name='delete-card' title='Вы уверены?' textButton='Да' />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </>
  );
}

export default App;
