import { configureStore } from "@reduxjs/toolkit";
import { UserCFSLice } from "./feature/UserCFSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ResultSLice } from "./feature/ResultSlice";

export const store = configureStore({
    reducer: {
        userCF: UserCFSLice.reducer,
        result: ResultSLice.reducer
    }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector