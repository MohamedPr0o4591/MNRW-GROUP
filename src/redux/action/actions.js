import axios from "axios";
import {
  GET_ALLPRODUCTS,
  GET_CATEGORIES,
  GET_COMPANIES,
  GET_RECENT_ORDER,
  GET_VISA_CARDS_DETAILS,
  GETTOKENACCESS,
  GETTOKENPROFILEINFO,
} from "../types/allTypes";

const apiHost = import.meta.env.VITE_API_HOST;

export const get_all_categories = (_) => {
  return async (dispatch) => {
    const res = await axios.get(`${apiHost}/categories/get_categories.php`);

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data.categories,
    });
  };
};

export const get_companies = (_) => {
  return async (dispatch) => {
    const res = await axios.get(`${apiHost}/companies/get_companies.php`);

    dispatch({
      type: GET_COMPANIES,
      payload: res.data.companies,
    });
  };
};

export const get_pro = (_) => {
  return async (dispatch) => {
    let res = await axios.get(`${apiHost}/products/fetch_allPro.php`);

    dispatch({
      type: GET_ALLPRODUCTS,
      payload: res.data.products,
    });
  };
};

export const get_recent_order_data = (token) => {
  return async (dispatch) => {
    let res = await axios.get(`${apiHost}/profile/latest_orders.php`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: GET_RECENT_ORDER,
      payload: res.data.orders,
    });
  };
};

export const get_userdata_token = (token) => {
  return async (dispatch) => {
    let res = await axios.get(`${apiHost}/auth/checkAuth.php`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: GETTOKENACCESS,
      payload: res.data.user,
    });
  };
};

export const get_profile_info = (token) => {
  return async (dispatch) => {
    let res = await axios.get(
      `${apiHost}/profile/fitch_profileData.php?u_id=${token}`
    );

    dispatch({
      type: GETTOKENPROFILEINFO,
      payload: res.data.user,
    });
  };
};

export const get_visa_details = (u_id) => {
  return async (dispatch) => {
    let res = await axios.get(`${apiHost}/visa card/fitch_visa_details.php`, {
      headers: {
        Authorization: `Bearer ${u_id}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: GET_VISA_CARDS_DETAILS,
      payload: res.data.cards,
    });
  };
};
