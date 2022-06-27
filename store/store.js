import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import { dataReducer } from "./reducer";
import { watcherSaga } from "../rootSaga/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    dataReducer,
  },
  middleware: [sagaMiddleware],
});

export default store;

sagaMiddleware.run(watcherSaga);
