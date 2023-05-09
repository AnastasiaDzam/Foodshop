import { useSelector } from 'react-redux';
import Card from '../../elements/card';
import style from './products.module.css';

function ProductsMain() {

  const products = useSelector(state => state.products.products)

  return (
    <main className={style['main']}>
      <div className={style['container']}>
        {products.map(item => {
          return (
            <Card
              key={item.id}
              id={item.id}
              url={item.url}
              title={item.title}
              description={item.description}
              price={item.price}
              weight={item.weight}
            />
          )
        })}
      </div>
    </main>
  )
}

export default ProductsMain;