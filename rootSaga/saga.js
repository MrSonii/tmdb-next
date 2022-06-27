import { takeLatest } from "redux-saga/effects";
import { GET_DATA } from "../store/types";
import { handleGetUser } from "./handeler";

export function* watcherSaga() {
  yield takeLatest(GET_DATA, handleGetUser);
}
