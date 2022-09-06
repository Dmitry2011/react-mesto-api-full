import '../../src/index.css';
import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from './EditProfilePopup';
import ConfirmationPopup from './ConfirmationPopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from "./ImagePopup";
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [selectedCard, setIsSelectedCard] = React.useState({});
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [isSuccsed, setSuccsed] = React.useState(true);

    // установка состояний пользователя, массив карточек, удаление карточки, вход в систему, меил пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [deletedCard, setDeletedCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState("");

  const history = useHistory();

    // регистрация
  const register = ({ email, password }) => {
    return auth
      .register(email, password)
      .then(() => {
        setSuccsed(true);
      })
      .catch((error) => {
        setSuccsed(false);
        console.log(`${error} 400 — Токен не передан или передан не в том формате; 401 — Переданный токен некорректен`)
      })
      .finally(setIsInfoToolTipOpen(true));
  };

    // авторизация
  const login = ({ email, password }) => {
    return auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        setUserData(email);
        history.push("/");
      })
      .catch((error) => {
        setSuccsed(false);
        setIsInfoToolTipOpen(true);
        setLoggedIn(false);
        console.log(`${error} 400 — не передано одно из полей; 401 — пользователь с email не найден`)
      });
  };

    // сохраняем токен, проверяем его валибность и отрисовываем в шапке
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getData(token)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setUserData(data.data.email);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

    // при перезагрузке странице авторизированному пользователю не нужно повторно вводить логин пароль
  React.useEffect(() => {
    if (loggedIn) history.push("/");
  }, [history, loggedIn]);

    // выход из системы
  const signOut = () => {
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  React.useEffect(()=>{
    if (loggedIn){
        // запрос на сервер за данными о пользователе и карточках
       Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userDataResult, initialCardsResult]) => {
          setCurrentUser(userDataResult);
          setCards(initialCardsResult);
        })
        .catch((error) => alert(`${error} Не удалось загрузить данные с сервера`));
    }
  }, [loggedIn]
  )

    // функция открытия попап изменения аватар
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

    // функция открытия попап изменения профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

    // функция открытия попап для добавления новой карточки
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
    // функция открытия попап подтверждения удаления
  const handleDeleteCardClick = (card) => {
    setIsConfirmationPopupOpen(true);
    setDeletedCard(card);
  }

    // функция открытия попап карточки
  const handleCardClick = (card) => {
    setIsSelectedCard(card)
  }

    // функция закрытия всех попапов
  function closeAllPopups (event) {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsConfirmationPopupOpen(false);
      setIsSelectedCard({});
      setIsInfoToolTipOpen(false);
    }
  }

  const replaceCard = (newCard) => {
    const newCards = cards.map(card => card._id === newCard._id ? newCard : card);
    setCards(newCards);
  }

    //Обработчик нажатия кнопки "like"
  const handleCardLike = (card) => {
    if (card.likes.some(i => i._id === currentUser._id))
      api.deleteLike(card._id)
        .then(newCard => replaceCard(newCard))
        .catch((error) => alert(`Не удалось убрать лайк. ${error}`));
    else
      api.addLike(card._id)
        .then(newCard => replaceCard(newCard))
        .catch((error) => alert(`Не удалось добавить лайк. ${error}`));
  }

    // Обработчик подтверждения удаления карточки
  const handleSubmitCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(i => i._id !== card._id);
        setCards(newCards);
        setIsConfirmationPopupOpen(false);
      })
      .catch((error) =>
        alert(`Не удалось удалить картачку. ${error}`),
        setIsConfirmationPopupOpen(false));
  }

    // Обработчик подтверждения изменения информации пользователя
  const handleUpdateUser = (name, about) => {
    api.updateUserData(name, about)
      .then(newInfo => {
        setCurrentUser(newInfo);
        setIsEditProfilePopupOpen(false);
      })
      .catch((error) => alert(`Не удалось изменить данные пользователя. ${error}`));
  }

    // Обработчик изменения аватара пользователя
  const handleAvatarUpdate = (newUrl) => {
    api.updateAvatar(newUrl)
      .then(newInfo => {
        setCurrentUser(newInfo);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((error) => alert(`Не удалось изменить аватар пользователя. ${error}`));
  }

    // Обработчик добавления карточки
  const handleAddPlaceSubmit = (name, link) => {
    api.addNewCard(name, link)
      .then(newCard  => {
        setCards([newCard , ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((error) => alert(`Не удалось добавить новую карточку. ${error}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userData} signOut={signOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
              // передаем функции через пропсы
            onEditProfileClick={handleEditProfileClick}
            onEditAvatarClick={handleEditAvatarClick}
            onAddPlaceClick={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onDeleteCardClick={handleDeleteCardClick}
            onCardLike = {handleCardLike}
            component={Main}
          ></ProtectedRoute>
          <Route path="/sign-in">
            <Login login={login} />
          </Route>
          <Route path="/sign-up">
            <Register register={register} />
          </Route>
        </Switch>
        <Footer/>
        <InfoToolTip
          id="reg-pic"
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          isSuccsed={isSuccsed}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUserUpdate={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <ConfirmationPopup
          name='delete'
          form='delete'
          title='Вы уверены?'
          text='Да'
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          deletedCard={deletedCard}
          onSubmit={handleSubmitCardDelete}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onAvatarUpdate={handleAvatarUpdate}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
