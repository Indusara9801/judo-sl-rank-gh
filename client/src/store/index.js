import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import userReducer from "./user/user";
import statusReducer from "./status/status";
import loadingStateReducer from "./loading-state/loading-state";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
//   whitelist: ['player'],
// };

const reducer = combineReducers({
  user: userReducer,
  status: statusReducer,
  loadingState: loadingStateReducer,
});

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

// const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: reducer,
  middleware: customizedMiddleware,
});

export default store;
