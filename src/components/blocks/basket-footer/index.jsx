import { useDispatch, useSelector } from 'react-redux';
import { clearProductsBasket } from '../../../store/reducers/products';
import style from './basket-footer.module.css'

function BasketFooter() {

  const productsBasket = useSelector(state => state.products.basketProducts)
  const totalPrice = useSelector(state => state.products.allPriceProductsBasket)
  
  const dispatch = useDispatch();
  const OrderCheck = (price) => {
    if (price > 0) {
      console.log('Заказ оформлен');
      dispatch(clearProductsBasket());
    } else {
      console.log('Ошибка');
    }
  }

  return (
    <footer className={style['basket__footer']}>
      <div className={style['basket__container']}>
        <p className={style['basket__order-price']}>
          Заказ на сумму: <span>{totalPrice.toLocaleString()} ₽</span>
        </p>
        <button onClick={() => OrderCheck(totalPrice)} className={style['basket__button']}>
          Оформить заказ
        </button>
      </div>
    </footer>
  )
}

export default BasketFooter;