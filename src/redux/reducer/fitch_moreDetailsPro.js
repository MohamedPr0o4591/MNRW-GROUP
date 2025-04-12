import { GET_MORE_DETAILS_PRO } from "../types/allTypes"

var initialState = {
    pro: {},
}

export const fitch_moreDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MORE_DETAILS_PRO:
            return {
                pro: action.payload,
            }
        default:
            return state;
    }
}