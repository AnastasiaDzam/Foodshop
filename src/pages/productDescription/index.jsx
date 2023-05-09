import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductDescriptionHeader from "../../components/blocks/productDescription-header";
import ProductDescriptionMain from "../../components/blocks/productDescription-main";
import NotAuth from "../NotAuth";
import style from './productDescription.module.css';
import { activeUserDataKey } from "../authRegForm";

function ProductDescription() {

  const products = useSelector(state => state.products.products);
  const { productId } = useParams();
  if (localStorage.getItem(activeUserDataKey)) {
    return (
      <div className={style['productDescription']}>
        <ProductDescriptionHeader />
        {
          products.filter((product) => product.id == productId).map((product) => (
            <ProductDescriptionMain
              key={product.id}
              id={product.id}
              urlImg={product.url}
              title={product.title}
              fullDescription={product.fullDescription}
              price={product.price}
              weight={product.weight}
            />
          ))
        }
      </div>
    )
  } else {
    return (
      <NotAuth />
    )
  }
}

export default ProductDescription;