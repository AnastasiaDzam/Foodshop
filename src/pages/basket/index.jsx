import BasketHeader from "../../components/blocks/basket-header";
import BasketMain from "../../components/blocks/basket-main";
import BasketFooter from "../../components/blocks/basket-footer";
import NotAuth from "../NotAuth";
import { activeUserDataKey } from "../authRegForm";

function Basket() {
  if (localStorage.getItem(activeUserDataKey)) {
    return (
      <div className="basket">
        <BasketHeader />
        <BasketMain />
        <BasketFooter />
      </div>
    )
  } else {
    return (
      <NotAuth />
    )
  }
}

export default Basket;