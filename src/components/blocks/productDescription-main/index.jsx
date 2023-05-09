import { useDispatch } from 'react-redux';
import { addProductsBasket } from '../../../store/reducers/products';
import uuid from 'react-uuid';
import style from './productDescription-main.module.css'

function ProductDescriptionMain({ id, urlImg, title, fullDescription, price, weight }) {

  const dispatch = useDispatch();

  const addProduct = (elem) => {
    elem.stopPropagation()
    const item = {
      id: id,
      idx: uuid(),
      title: title,
      url: urlImg,
      price: price
    }
    dispatch(addProductsBasket(item))
  }

  return (
    <main className={style['productDesc']}>
      <div className={style['container']}>
        <div className={style['productDesc__img']}>
          <img src={'./' + urlImg} alt="product-image" width='501px' />
        </div>
        <section className={style['productDesc__info']}>
          <h1 className={style['productDesc__title']}>
            {title}
          </h1>
          <p className={style['productDesc__description']}>
            {fullDescription}
          </p>
          <div className={style['productDesc__commercial']}>
            <p className={style['productDesc__price']}>
              {price.toLocaleString()} ₽ <span>/ {weight} г.</span>
            </p>
            <button onClick={addProduct} className={style['productDesc__toBasket']}>
              В корзину
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ProductDescriptionMain;