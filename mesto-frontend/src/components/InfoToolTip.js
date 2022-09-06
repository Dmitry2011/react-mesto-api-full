import react from "react";

function InfoToolTip({ id, isOpen, onClose, isSuccsed }) {
  function closeByEsc(event) {
    if (event.key === "Escape") {
      onClose && onClose();
    }
  }

  react.useEffect(() => {
    document.addEventListener("keyup", closeByEsc);
    return () => {
      document.removeEventListener("keyup", closeByEsc);
    };
  }, [isOpen, onClose]);

  function changeTipMessage() {
    let message;
    if (isSuccsed === true) {
      message = "Вы успешно зарегистрировались!";
    }
    if (isSuccsed === false) {
      message = "Что-то пошло не так! Попробуйте еще раз.";
    }
    return message;
  }

  return (
    <div className={isOpen ? `popup_opened popup` : `popup`} id={id} onClick={onClose}>
      <div className={`popup__container popup__container-info`}>
        <div className={isSuccsed ? `popup__auth-image-ok` : `popup__auth-image-error`}/>
        <h3 className="popup__title popup__title-info">{changeTipMessage()}</h3>
        <button type="button" aria-label="Закрыть" className="popup__close" onClick={onClose}/>
      </div>
    </div>
  );
}

export default InfoToolTip;
