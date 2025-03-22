import { GET_ALLPRODUCTS } from "../types/allTypes";

const initial = {
  pro: [],
};

export const productsReducer = (state = initial, action) => {
  switch (action.type) {
    case GET_ALLPRODUCTS:
      return { pro: action.payload };

    default:
      return state;
  }
};
