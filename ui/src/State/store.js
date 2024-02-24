import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../State/AuthSlice";
import projectReducer from "../State/ProjectSlice";
import apiLoadingReducer from "../State/apiLoadingSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth", "project", "apiLoading"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  apiLoading: apiLoadingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
