import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputValue = React.useRef();
  const [urlError, setUrlError] = React.useState('Поле обязательно для заполнения');

   const handleSubmit = (event) => {
    event.preventDefault();
    props.onAvatarUpdate(inputValue.current.value);
  }

  const handleChange = (event) => {
    event.preventDefault();
    if (!event.target.validity.valid)
      setUrlError(event.target.validationMessage)
    else
      setUrlError('')
  }

  React.useEffect(() => {
    setUrlError('Поле обязательно для заполнения');
    inputValue.current.value = '';
  }, [props.isOpen])

  return (
    <PopupWithForm
      name='user-avatar'
      form='avatar'
      title='Обновить аватар'
      text='Сохранить'
      submitAvailable={urlError ? false : true}
      onSubmit={handleSubmit}
      {...props}
    >
    <input
      id='user-avatar-input'
      name="links"
      className="popup__subtitle popup__subtitle_type_link popup__input"
      type="url"
      required
      placeholder = 'Ссылка на аватар'
      ref={inputValue}
      onChange={handleChange}
    />
    <span
      className={`popup__input-error ${urlError ? 'popup__input-error_active' : ''}`} id="user-avatar-input-error">
      {urlError}
    </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
