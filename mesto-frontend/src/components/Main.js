import React from "react";
import editing from '../images/editing.svg';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img src={currentUser.avatar} alt="фото пользователя"  className="profile__avatar"/>
        <div className="profile__avatar profile__avatar-overlay">
          <img onClick={props.onEditAvatarClick} src={editing} alt="рисунок карандаш, редактирование фотографии пользователя" className="profile__avatar-edit"/>
        </div>
        <div className="profile__info">
          <div>
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button onClick={props.onEditProfileClick} type="button" aria-label="Редактировать профиль" className="profile__edit-button"/>
        </div>
        <button onClick={props.onAddPlaceClick} type="button" aria-label="Добавить картачку" className="profile__add-button"/>
      </section>
      <section className="elements" aria-label="Секция со списком карточек">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onDeleteCardClick={props.onDeleteCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
