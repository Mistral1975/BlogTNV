import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import userReducer from "./userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage: storage
};

const userPersistor = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        todo: postReducer,
        user: userPersistor
    },
});

export const persistor = persistStore(store);