import { configureStore } from "@reduxjs/toolkit";
import taiKhoanSlice from "./Reducer/taiKhoanSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import IDchitietsanphamSlice from "./Reducer/IDchitietsanphamSlice";
import GetSanPhamGioHangSlice from "./Reducer/GetSanPhamGioHangSlice";
import LoadingSlice from "./Reducer/LoadingSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, taiKhoanSlice);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    getIDchitietsanpham: IDchitietsanphamSlice,
    sanPhamGioHang: GetSanPhamGioHangSlice,
    Loading: LoadingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
