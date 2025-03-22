import { GETTOKENPROFILEINFO } from "../types/allTypes";

var initialState = {
  data: [],
};

export const fitch_profileInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTOKENPROFILEINFO:
      return {
        data: action.payload,
      };
    default:
      return state;
  }
};
