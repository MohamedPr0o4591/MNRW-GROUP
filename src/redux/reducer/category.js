import { GET_CATEGORIES } from "../types/allTypes";

const initial = {
  categories: [],
};

export const categoriesReducer = (state = initial, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        categories: action.payload,
      };
    default:
      return state;
  }
};
