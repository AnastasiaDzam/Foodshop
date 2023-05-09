import { useNavigate } from 'react-router-dom';
import { activeUserDataKey } from '../authRegForm';
import style from './NotAuth.module.css'

function NotAuth() {

  const backToAuth = useNavigate();

  const linkToAuth = () => {
    localStorage.removeItem(activeUserDataKey)
    backToAuth(`/`);
  }

  return (
    <div className={style['warning']}>
      <div className={style['warning__container']}>
        <h1 className={style['warning__title']}>
          ВЫ НЕ АВТОРИЗОВАНЫ
        </h1>
        <p className={style['warning__msg']}>
          Для того чтобы увидеть ассортимент магазина, Вам необходимо авторизоваться в системе
        </p>
        <button onClick={linkToAuth} className={style['warning__button']}>Вернуться на страницу авторизации</button>
      </div>
    </div>
  )
}

export default NotAuth;