import { configureStore } from "@reduxjs/toolkit";
import taiKhoanSlice from "./Reducer/taiKhoanSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import IDchitietsanphamSlice from "./Reducer/IDchitietsanphamSlice";
import GetSanPhamGioHangSlice from "./Reducer/GetSanPhamGioHangSlice";
import LoadingSlice from "./Reducer/LoadingSlice";
import IDLoaiSPSlice from "./Reducer/IDLoaiSPSlice";
import chitietsanphamonl from "./Reducer/chitietsanphamonl";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, taiKhoanSlice);
const chitietsanpham = persistReducer(persistConfig, chitietsanphamonl);
const GetSanPhamGioHangSlices = persistReducer(
  persistConfig,
  GetSanPhamGioHangSlice
);
const store = configureStore({
  reducer: {
    user: persistedReducer,
    getIDchitietsanpham: IDchitietsanphamSlice,
    sanPhamGioHang: GetSanPhamGioHangSlices,
    // sanPhamGioHang: GetSanPhamGioHangSlice,
    Loading: LoadingSlice,
    setidloaisp: IDLoaiSPSlice,
    setchitietsp: chitietsanpham,
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
