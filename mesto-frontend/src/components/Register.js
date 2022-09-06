import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Register = ({ register }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    register({ email, password })
      .then(resetForm)
      .then(() => history.push("/sign-in"));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePaswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <section className="popup__container popup__container-auth">
      <h2 className="popup__title popup__title-auth">Регистрация</h2>
      <form onSubmit={handleSubmit} className="popup__form">
        <input
          className="popup__subtitle popup__subtitle-auth"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="popup__subtitle popup__subtitle-auth"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePaswordChange}
        />
        <button type="submit" className="popup__button popup__button-auth">
          Зарегистрироваться
        </button>
      </form>
      <div className="popup__container-login-link">
        <p className="popup__login-link"> Уже зарегистрированы?</p>
        <Link to="sign-in" className="popup__login-link">
          Войти
        </Link>
      </div>
    </section>
  );
};

export default Register;
