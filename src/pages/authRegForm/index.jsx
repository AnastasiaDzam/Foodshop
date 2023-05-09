import { Link, useNavigate } from 'react-router-dom'
import './authRegForm.css'
import React, { useState } from "react";
import Products from '../products';

//CODE-NAMES OF ERRORS
const OK = 0;
const EMPTY = 1;
const TOOSHORT = 2;
const INVALID = 3;

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const usersDataKey = 'usersData';
let usersDataValue = [];
if (!JSON.parse(localStorage.getItem(usersDataKey))) {
  localStorage.setItem(usersDataKey, JSON.stringify(usersDataValue));
} else {
  usersDataValue = JSON.parse(localStorage.getItem(usersDataKey));
}
export const activeUserDataKey = 'activeUserData';

function AuthRegForm(props) {

  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };

  const [emailRegInput, setEmailRegInput] = useState(props.value);
  const [passRegInput, setPassRegInput] = useState(props.value);
  const [checkRegInput, setCheckRegInput] = useState(false);
  const handleChange = () => {
    setCheckRegInput(!checkRegInput);
  };

  const [emailRegErrors, setEmailRegErrors] = useState(OK);
  const [passRegErrors, setPassRegErrors] = useState(OK);
  const [checkRegErrors, setCheckRegErrors] = useState(OK);
  const [regErrors, setRegErrors] = useState(OK);

  const handleRegInput = () => {
    let allGood = 0;
    setRegErrors(OK);

    if (!emailRegInput) {
      setEmailRegErrors(EMPTY);
    } else if (emailRegInput.length < 4) {
      setEmailRegErrors(TOOSHORT);
    } else if (emailRegInput.length > 3 && !validateEmail(emailRegInput)) {
      setEmailRegErrors(INVALID);
    } else {
      setEmailRegErrors(OK);
      allGood = allGood + 1;
    }
    if (!passRegInput) {
      setPassRegErrors(EMPTY);
    } else if (passRegInput.length < 4 && passRegInput) {
      setPassRegErrors(TOOSHORT);
    } else {
      setPassRegErrors(OK);
      allGood = allGood + 2;
    }
    if (checkRegInput) {
      setCheckRegErrors(OK);
      allGood = allGood + 4;
    } else {
      setCheckRegErrors(EMPTY);
    }
    if (allGood == 7) {
      if (localStorage.getItem(usersDataKey)) {
        usersDataValue = JSON.parse(localStorage.getItem(usersDataKey));
      } else {
        localStorage.setItem(usersDataKey, JSON.stringify(usersDataValue));
      }
      if (usersDataValue.findIndex((item) => item.email === emailRegInput) == -1) {
        usersDataValue.push({ email: emailRegInput, password: passRegInput });
        localStorage.setItem(usersDataKey, JSON.stringify(usersDataValue));
        console.log(`Пользователь с Email - "${emailRegInput}" успешно зарегестрирован`);
      } else {
        setRegErrors(INVALID);
      }
    }
  }

  const [emailAuthInput, setEmailAuthInput] = useState(props.value);
  const [passAuthInput, setPassAuthInput] = useState(props.value);

  const [emailAuthErrors, setEmailAuthErrors] = useState(OK);
  const [passAuthErrors, setPassAuthErrors] = useState(OK);
  const [authErrors, setAuthErrors] = useState(OK);

  const openProducts = useNavigate();
  const handleAuthInput = () => {
    let allGood = 0;
    setAuthErrors(OK);
    if (!emailAuthInput) {
      setEmailAuthErrors(EMPTY);
    } else if (emailAuthInput && !validateEmail(emailAuthInput)) {
      setEmailAuthErrors(INVALID);
    } else {
      setEmailAuthErrors(OK);
      allGood = allGood + 1;
    }
    if (!passAuthInput) {
      setPassAuthErrors(EMPTY);
    } else {
      setPassAuthErrors(OK);
      allGood = allGood + 2;
    }

    if (allGood == 3) {
      if (usersDataValue.findIndex((item) => item.email === emailAuthInput && item.password === passAuthInput) == -1) {
        allGood = allGood + 4;
        setAuthErrors(INVALID);
      } else {
        localStorage.setItem(activeUserDataKey, JSON.stringify({ email: emailAuthInput, password: passAuthInput, subToNews: true }))
        openProducts(`/products`);
      }
    }
  }

  if (localStorage.getItem(activeUserDataKey)) {
    return (
      <Products />
    )
  } else return (
    <div className="dialog-form">

      <div className="dialog-form__page">

        <div className={`dialog-form__container dialog-form__login ${isActive ? "" : "disable-block"}`}>

          <p className="dialog-form__login-registration-link">
            <Link onClick={handleToggle}>Зарегистрироваться</Link>
          </p>
          <h1 className="dialog-form__title">
            ВХОД
          </h1>

          <form id="dialog-form-login">
            <div className="dialog-form__container-inputs">
              <div className="dialog-form__input">
                <div className="dialog-form__input-container">
                  <p className={`dialog-form__input-required ${emailAuthErrors ? "errorMsg" : ""}`}>
                    *
                  </p>
                  <input type="text" className={`dialog-form__input-field ${emailAuthErrors ? "invalid-data" : ""}`} onInput={e => setEmailAuthInput(e.target.value)} id="login-email" placeholder="Логин" />
                </div>
                <p className={`error-msg-empty ${emailAuthErrors ? "enable-block" : ""}`}>{emailAuthErrors == INVALID ? 'Некорректный Email' : 'Поле обязательно для заполнения'}</p>
              </div>

              <div className="dialog-form__input">
                <div className="dialog-form__input-container">
                  <p className={`dialog-form__input-required ${passAuthErrors ? "errorMsg" : ""}`}>
                    *
                  </p>
                  <input type="text" className={`dialog-form__input-field ${passAuthErrors ? "invalid-data" : ""}`} onInput={e => setPassAuthInput(e.target.value)} id="login-pass" placeholder="Пароль" />
                </div>
                <p className={`error-msg-empty ${passAuthErrors ? "enable-block" : ""}`}>{passAuthErrors == TOOSHORT ? 'Пароль должен содержать как минимум 4 символа' : 'Поле обязательно для заполнения'}</p>
              </div>

              <div className="dialog-form__input-container">
                <label htmlFor="input-check-policy" className="dialog-form__input-check-label">
                  <input type="checkbox" className="dialog-form__input-check" id="input-check-policy" />
                  <span className="dialog-form__input-check-policy">
                    Я согласен с получать обновления на почту
                  </span>
                </label>
              </div>
            </div>
            <p className={`error-msg-empty error-msg-empty_onCenter ${authErrors == INVALID ? "enable-block" : ""}`}>Логин или пароль неверен</p>
            <button type="button" onClick={handleAuthInput} className="dialog-form__button dialog-form__button_login">
              Войти
            </button>
          </form>
        </div>

        <div className={`dialog-form__container switch-reg-login dialog-form__reg ${isActive ? "disable-block" : ""}`}>

          <p className="dialog-form__login-registration-link">
            <Link onClick={handleToggle}>Авторизоваться</Link>
          </p>
          <h1 className="dialog-form__title">
            РЕГИСТРАЦИЯ
          </h1>

          <form id="dialog-form-reg">
            <div className="dialog-form__container-inputs">

              <div className="dialog-form__input">
                <div className="dialog-form__input-container">
                  <p className={`dialog-form__input-required ${emailRegErrors ? "errorMsg" : ""}`}>
                    *
                  </p>
                  <input onInput={e => setEmailRegInput(e.target.value)} type="text" className={`dialog-form__input-field ${emailRegErrors ? "invalid-data" : ""}`} id="reg-email" placeholder="Логин" />
                </div>
                <p className={`error-msg-empty ${emailRegErrors ? "enable-block" : ""}`}>{emailRegErrors == INVALID ? 'Некорректный Email' : emailRegErrors == TOOSHORT ? 'Логин должен содержать не менее 4-х символов' : 'Поле обязательно для заполнения'}</p>
              </div>

              <div className="dialog-form__input">
                <div className="dialog-form__input-container">
                  <p className={`dialog-form__input-required ${passRegErrors ? "errorMsg" : ""}`}>
                    *
                  </p>
                  <input onInput={e => setPassRegInput(e.target.value)} type="text" className={`dialog-form__input-field ${passRegErrors ? "invalid-data" : ""}`} id="reg-pass" placeholder="Пароль" />
                </div>
                <p className={`error-msg-empty ${passRegErrors ? "enable-block" : ""}`}>{passRegErrors == TOOSHORT ? 'Пароль должен содержать не менее 4-х символов' : 'Поле обязательно для заполнения'}</p>
              </div>

              <div className="dialog-form__input-container">
                <p className={`dialog-form__input-required dialog-form__input-required_checkbox ${checkRegErrors ? "errorMsg" : ""}`}>
                  *
                </p>
                <label htmlFor="input-check-mail" className="dialog-form__input-check-label">
                  <input type="checkbox" onChange={handleChange} className={`dialog-form__input-check ${checkRegErrors ? "errorMsg" : ""}`} id="input-check-mail" />
                  <span className="dialog-form__input-check-policy">
                    Я согласен&nbsp;
                    <Link>Правилами пользования приложением</Link>
                  </span>
                </label>
                <p className={`error-msg-empty ${checkRegErrors ? "enable-block" : ""}`}>Поле обязательно для заполнения</p>
              </div>
            </div>
            <p className={`error-msg-empty error-msg-empty_onCenter ${regErrors == INVALID ? "enable-block" : ""}`}>Такой Email уже существует</p>

            <button type="button" onClick={handleRegInput} className="dialog-form__button dialog-form__button_reg">
              Зарегистрироваться
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default AuthRegForm;