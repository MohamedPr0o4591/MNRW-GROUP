import { GETTOKENACCESS } from "../types/allTypes";

let initialState = {
  user: [],
};

export const userData_tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTOKENACCESS:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};
