import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    login({ email, password })
      .then(resetForm)
      .then(() => history.push("/"));
  };

  return (
    <section className="popup__container popup__container-auth">
      <h2 className="popup__title popup__title-auth">Вход</h2>
      <form onSubmit={handleSubmit} className="popup__form">
        <input
          className="popup__subtitle popup__subtitle-auth"
          id="email"
          name="email"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="popup__subtitle popup__subtitle-auth"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" className="popup__button popup__button-auth">
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;
