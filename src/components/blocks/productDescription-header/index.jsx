import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { activeUserDataKey } from '../../../pages/authRegForm';
import style from './productDescription-header.module.css'
import { useDispatch } from 'react-redux';
import { clearProductsBasket } from '../../../store/reducers/products';

function lastTextSymbol(counter, wordArray) {
  let subCounter = counter % 100;
  counter = counter % 10;

  if (subCounter > 10 && subCounter < 20) {
    return wordArray[2];
  }
  if (counter == 1) {
    return wordArray[0];
  }
  else if (counter > 1 && counter < 5) {
    return wordArray[1];
  }
  return wordArray[2];
}

function ProductDescriptionHeader() {

  const productCount = useSelector(state => state.products.countProduct)
  const productPrice = useSelector(state => state.products.allPriceProductsBasket)

  const backToAuth = useNavigate();

  const dispatch = useDispatch()

  const linkToAuth = () => {
    dispatch(clearProductsBasket());
    localStorage.removeItem(activeUserDataKey);
    backToAuth(`/`);
  }

  return (
    <header className={style['header']}>
      <div className={style['container']}>
        <Link className={style['header__products-img-container']} to={'/products'}>
          <img className={style['header__img']} src="./img/backArrow.svg" alt="photo" />
        </Link>
        <div className={style['header__cart']}>
          <div className={style['header__goods']}>
            <p className={style['header__number-of-goods']}>
              {productCount} {lastTextSymbol(productCount, ["товар", "товара", "товаров"])}
            </p>
            <p className={style['header__price']}>
              на сумму {productPrice.toLocaleString()} ₽
            </p>
          </div>
          <Link className={style['header__img-container']} to={'/basket'}>
            <img className={style['header__img']} src="./img/Group 71.svg" alt="photo" />
          </Link>
          <button onClick={linkToAuth} className={style['header__button']}>
            Выйти
          </button>
        </div>
      </div>
    </header>
  )
}

export default ProductDescriptionHeader;