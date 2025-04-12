import { combineReducers } from "redux";
import { categoriesReducer } from "./category";
import { companyReducer } from "./company";
import { productsReducer } from "./products";
import { userData_tokenReducer } from "./userData_token";
import { fitch_profileInfoReducer } from "./fitch_profileInfo";
import { recent_order_reducer } from "./recent_order";
import { visa_details_reducer } from "./visa_details";
import { fitch_moreDetailsReducer } from "./fitch_moreDetailsPro";

export const rootReducers = combineReducers({
  CATEGORIES: categoriesReducer,
  GET_COMPANIES: companyReducer,
  GET_PRODUCTS: productsReducer,
  GET_USERDATA_TOKEN: userData_tokenReducer,
  GET_PROFILE_USER: fitch_profileInfoReducer,
  GET_RECENT_ORDERS: recent_order_reducer,
  GET_VISA_CARD_DETAILS: visa_details_reducer,
  GET_MORE_DETAILS_PRO: fitch_moreDetailsReducer,
});
