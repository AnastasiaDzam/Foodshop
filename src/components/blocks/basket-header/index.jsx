import { Link, useNavigate } from 'react-router-dom';
import { activeUserDataKey } from '../../../pages/authRegForm';
import style from './basket-header.module.css'
import { useDispatch } from 'react-redux';
import { clearProductsBasket } from '../../../store/reducers/products';

function BasketHeader() {

  const backToAuth = useNavigate();

  const dispatch = useDispatch()

  const linkToAuth = () => {
    dispatch(clearProductsBasket());
    localStorage.removeItem(activeUserDataKey);
    backToAuth(`/`);
  }

  return (
    <header className={style['basket__header']}>
      <div className={style['basket__container']}>
        <div className={style['basket__left-side']}>
          <Link className={style['basket__back']} to={-1}>
            <img className={style['basket__back-img']} src="./img/backArrow.svg" alt="back" />
          </Link>
          <h1 className={style['basket__title']}>КОРЗИНА С ВЫБРАННЫМИ ТОВАРАМИ</h1>
        </div>
        <button onClick={linkToAuth} className={style['basket__header-button']}>
          Выйти
        </button>
      </div>
    </header>
  )
}

export default BasketHeader;