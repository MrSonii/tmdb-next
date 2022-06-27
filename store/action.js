import * as types from "./types.js";

export const getData = () => ({ type: types.GET_DATA });

export const getDataSucc = (payload) => ({
  type: types.GET_DATA_SUCC,
  payload,
});

export const getDataFail = (payload) => ({
  type: types.GET_DATA_FAIL,
  payload,
});
