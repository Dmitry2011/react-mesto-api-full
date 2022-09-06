import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const handleCardClick = () => props.onCardClick(props.card);
  const hadleCardLike = () => props.onCardLike(props.card);
  const handleDeleteCard = () => props.onDeleteCardClick(props.card);


    // проверка своей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? ' ' : 'element__delete_hidden'}`
  );

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__group ${isLiked ? 'element__group_type_activ' : ''}`
  );

  return (
    <li className="element">
      <img src={props.card.link} alt={props.card.name} className="element__mask-group" onClick={handleCardClick}/>
      <h2 className="element__title">{props.card.name}</h2>
      <div className="element__likes">
        <button onClick={hadleCardLike} type="button" aria-label="Лайк" className={cardLikeButtonClassName}/>
        <div className="element__likes-counter">{props.card.likes.length}</div>
      </div>
      <button onClick={handleDeleteCard} type="submit" aria-label="Удалить карточку" className={cardDeleteButtonClassName}>
        <div className="element__cap"/>
        <div className="element__basket"/>
      </button>
    </li>
  );
}

export default Card;
