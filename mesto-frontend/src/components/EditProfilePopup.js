import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  const handleChangeName = (event) => {
    setName(event.target.value);
    if (!event.target.validity.valid)
      setNameError(event.target.validationMessage)
    else
      setNameError('')
  }

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
    if (!event.target.validity.valid)
      setDescriptionError(event.target.validationMessage)
    else
      setDescriptionError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onUserUpdate(name, description)
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameError('');
    setDescriptionError('');
  }, [currentUser, props.isOpen])



  return (
    <PopupWithForm
      name='profile'
      form='profile'
      title='Редактировать профиль'
      text='Сохранить'
      onSubmit={handleSubmit}
      submitAvailable={nameError || descriptionError ? false : true}
      {...props}
    >
      <input
        id='name-input'
        name="name"
        className="popup__subtitle popup__subtitle_type_name popup__input"
        type="text"
        required
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName}
      />
      <span
        className={`popup__input-error ${nameError ? 'popup__input-error_active' : ''}`}
        id="name-input-error">
        {nameError}
      </span>
      <input
        id='profession-input'
        name="profession"
        className="popup__subtitle popup__subtitle_type_profession popup__input"
        type="text"
        required
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span
        className={`popup__input-error ${descriptionError ? 'popup__input-error_active' : ''}`}
        id="profession-input-error">
        {descriptionError}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
