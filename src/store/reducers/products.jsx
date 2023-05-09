import { createSlice, current } from "@reduxjs/toolkit"
import { products } from "../../components/blocks/products-main/products.js"

const initialState = {
  products: products,
  basketProducts: [],
  countProduct: 0,
  allPriceProductsBasket: 0
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductsBasket: (state, action) => {
      state.basketProducts.push(action.payload)
      state.countProduct = state.basketProducts.length
      state.allPriceProductsBasket = state.basketProducts.reduce((acc, current) => {
        return acc + current.price;
      }, 0)
    },
    removeProductsBasket: (state, action) => {
      state.basketProducts = state.basketProducts.filter((item) => {
        return item.idx !== action.payload;
      })
      state.countProduct = state.basketProducts.length
      state.allPriceProductsBasket = state.basketProducts.reduce((acc, current) => {
        return acc + current.price;
      }, 0)
    },
    clearProductsBasket: (state) => {
      state.basketProducts = [];
      state.countProduct = state.basketProducts.length;
      state.allPriceProductsBasket = state.basketProducts.reduce((acc, current) => {
        return acc + current.price;
      }, 0)
    }
  }
})

export const { addProductsBasket, removeProductsBasket, clearProductsBasket } = productsSlice.actions

export default productsSlice.reducer