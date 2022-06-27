import * as types from "./types.js";

const initState = {
  error: {},
  loading: false,
  data: {},
};

export const dataReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.GET_DATA:
      return {
        ...state,
        loading: true,
      };
    case types.GET_DATA_SUCC:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case types.GET_DATA_FAIL:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
      break;
  }
};
