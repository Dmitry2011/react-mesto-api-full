import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState('');
  const [placeUrl, setPlaceUrl] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [urlError, setUrlError] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddPlaceSubmit(placeName, placeUrl)
  }

  const handleChangeName = (event) => {
    setPlaceName(event.target.value);
    if (!event.target.validity.valid)
      setNameError(event.target.validationMessage)
    else
      setNameError('')
  }

  const handleChangeUrl = (event) => {
    setPlaceUrl(event.target.value)
    if (!event.target.validity.valid)
      setUrlError(event.target.validationMessage)
    else
      setUrlError('')
  }

  React.useEffect(() => {
    setNameError('Поле обязательно для заполнения');
    setUrlError('Поле обязательно для заполнения');
    setPlaceName('');
    setPlaceUrl('');
  }, [props.isOpen])

  return (
    <PopupWithForm
      name='new-location'
      form='mesto'
      title='Новое место'
      text='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitAvailable={nameError || urlError ? false : true}
      onSubmit={handleSubmit}
    >
      <input
        id='mesto-input'
        name="name"
        className="popup__subtitle popup__subtitle_type_mesto popup__input"
        type="text"
        required
        minLength="2"
        maxLength="30"
        placeholder = 'Название'
        onChange={handleChangeName}
        value={placeName || ''}
      />
      <span
        className={`popup__input-error ${nameError ? 'popup__input-error_active' : ''}`}
        id="mesto-input-error">
        {nameError}
      </span>
      <input
        id='link-input'
        name="link"
        className="popup__subtitle popup__subtitle_type_link popup__input"
        type="url"
        required
        placeholder = 'Ссылка на картинку'
        onChange={handleChangeUrl}
        value={placeUrl || ''}
      />
      <span
        className={`popup__input-error ${urlError ? 'popup__input-error_active' : ''}`} id="link-input-error">
        {urlError}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
