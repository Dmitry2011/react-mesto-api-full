import React from 'react';

function ConfirmationPopup(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(props.deletedCard);
  }

  return (
    <div className={props.isOpen ? 'popup popup_opened' : 'popup'}  onClick={props.onClose}>
      <form className="popup__container" onSubmit={handleSubmit}>
        <h2 className="popup__title">{props.title}</h2>
        <button className="popup__button" type="submit">{props.text}</button>
        <button className="popup__close" type="button" onClick={props.onClose} />
      </form>
    </div>
  )
}

export default ConfirmationPopup;
