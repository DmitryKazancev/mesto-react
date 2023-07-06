import Header from "./Header/Header.js";
import Main from './Main/Main.js';
import Footer from "./Footer/Footer.js";
import PopupWithForm from "./PopupWithForms/PopupWithForm.js";
import ImagePopup from "./ImagePopup/ImagePopup.js";
import { useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { useEffect } from "react";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.js";

function App() {

  //States
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

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

  
  //Delete card function
  function handleCardDelete(card) {
  const currentCard = card;
  api.deleteCard(currentCard._id)
    .then(() => {
      setCards(prevCards => prevCards.filter(card => {
        return card._id !== currentCard._id
      }))
    })
    .catch(error => {
      console.error(`Ошибка удаления карточки ${error}`)
    })
}

  //Set or delete like to card function
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(error => {
          console.error(`Ошибка удаления лайка ${error}`)
        })
    }
    else {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(error => {
          console.error(`Ошибка установки лайка ${error}`)
        })
    }
  }

  //Update info about user function
  function handleUpdateUser(infoUser, resetForm) {
    api.setOwnerInfo(infoUser)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
        resetForm();
      })
      .catch(error => {
        console.error(`Ошибка редактирования профиля ${error}`)
      })
  }

  //Update user avatar function
  function handleUpdateAvatar(infoUser, resetForm) {
    api.setOwnerAvatar(infoUser)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
        resetForm();
      })
      .catch(error => {
        console.error(`Ошибка редактирования аватара ${error}`)
      })
  }

  //Add new card function
  function handleAddPlaceSubmit(infoCard, resetForm) {
    api.addNewCard(infoCard)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
        resetForm();
      })
      .catch(error => {
        console.error(`Ошибка добавления карточки ${error}`)
      })
  }

  //Get info about user and cards from server
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([infoUser, infoCards]) => {
        setCurrentUser(infoUser);
        setCards(infoCards);
      })
      .catch(error => {
        console.error(`Ошибка запроса данных с сервера ${error}`)
      })
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {/*Section HEADER*/}
        <Header />
        {/*main content*/}
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        {/*Section FOOTER  */}
        <Footer />
        {/*Popups sections  */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm name='delete-card' title='Вы уверены?' textButton='Да' />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
