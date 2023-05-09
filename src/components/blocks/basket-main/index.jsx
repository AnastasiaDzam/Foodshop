import style from './basket-main.module.css'
import BasketCard from '../../elements/basket-card/';
import { useSelector } from 'react-redux';

function BasketMain() {
  const productsBasket = useSelector(state => state.products.basketProducts)
  return (
    <main className={style['basket__main']}>
      <div className={style['basket__container']}>
        {productsBasket.map(item => {
          return (
            <BasketCard
              key={item.idx}
              id={item.idx}
              urlImg={item.url}
              title={item.title}
              price={item.price}
            />
          )
        })}
      </div>
    </main>
  )
}

export default BasketMain;