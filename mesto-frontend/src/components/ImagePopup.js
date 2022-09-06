import React from 'react';

function ImagePopup ({card, onClose}) {

  return (
    <div className={`popup ${card.link && 'popup_opened'}`} onClick={onClose} >
      <div className="picture">
        <img src={card ? card.link: ''} alt={card ? card.name: ''} className="picture__card"/>
        <h3 className="picture__title">{card ? card.name: ''}</h3>
        <button type="button" aria-label="Закрыть" className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup
