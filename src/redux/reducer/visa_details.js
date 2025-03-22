import { GET_VISA_CARDS_DETAILS } from "../types/allTypes";

const initialVisaDetails = {
  details: [],
};

export const visa_details_reducer = (state = initialVisaDetails, action) => {
  switch (action.type) {
    case GET_VISA_CARDS_DETAILS:
      return {
        details: action.payload,
      };
    default:
      return state;
  }
};
