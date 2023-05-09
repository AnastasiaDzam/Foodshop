import { useDispatch } from 'react-redux';
import { removeProductsBasket } from '../../../store/reducers/products';
import './basket-card.css'


function BasketCard({ id, urlImg, title, price }) {

  const dispatch = useDispatch()

  const removeProduct = () => {
    console.log(id);
    dispatch(removeProductsBasket(id))
  }

  return (
    <div className='basket__product'>
      <div className='basket__meal-name'>
        <div className='basket__product-img'>
          <img src={urlImg} width='122px' alt="product" />
        </div>
        <p className='basket__description'>
          {title}
        </p>
      </div>
      <div className='basket__leftbar'>
        <div className='basket__price'>
          {price.toLocaleString()} ₽
        </div>
        <div className='basket__xmark-container'>
          <img className='basket__xmark' src="./img/xMark.svg" alt="xmark" onClick={removeProduct} />
        </div>
      </div>
    </div>
  )
}

export default BasketCard;