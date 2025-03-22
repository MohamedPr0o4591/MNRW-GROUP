import { GET_COMPANIES } from "../types/allTypes";

const initial = {
  companies: [],
};

export const companyReducer = (state = initial, action) => {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        companies: action.payload,
      };

    default:
      return state;
  }
};
