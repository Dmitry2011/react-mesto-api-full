import React from 'react';

function PopupWithForm (props) {
  return (
    <div className={props.isOpen ? 'popup popup_opened' : 'popup'} onClick={props.onClose}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
          <form name={`form-${props.form}`} className={`popup__form popup__form-${props.form}`} onSubmit={props.onSubmit}>
          <button type="button" aria-label="Закрыть" className="popup__close" onClick={props.onClose}/>
          {props.children}
          <button type="submit" className="popup__button">{props.text}</button>
        </form>
      </div>
    </div>
  )
}
export default PopupWithForm
