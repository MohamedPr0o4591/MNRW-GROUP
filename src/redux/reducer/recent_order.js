import { GET_RECENT_ORDER } from "../types/allTypes";

let initialState = {
  orders: [],
};

export const recent_order_reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECENT_ORDER:
      return {
        orders: action.payload,
      };

    default:
      return state;
  }
};
