import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer,setLoginReducer } from "./productsReducer";
const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  login:setLoginReducer
});
export default reducers;
