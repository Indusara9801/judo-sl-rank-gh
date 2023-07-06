import { createAsyncThunk } from "@reduxjs/toolkit";

import { errorTypes, loadingStateConst, localStorageKeys, url } from "../../constants";
import { loadingStateActions } from "../loading-state/loading-state";
import { statusActions } from "../status/status";
import { statusConst } from "../../constants";
import axios from "axios";
import { formatRole, handleFailure } from "../../common";

export const signUpUser = createAsyncThunk(
    "signUpUser",
    async (userData, { dispatch }) => {
        dispatch(
            loadingStateActions.setLoadingState({
                loadingState: loadingStateConst.PENDING,
            })
        );
        try {
            await axios.post(
                `${url}/auth/account`,
                userData,
            );
            dispatch(
                loadingStateActions.setLoadingState({
                    loadingState: loadingStateConst.FULLFILLED,
                })
            );
            dispatch(
                statusActions.setStatus({
                    status: statusConst.WARNING,
                    message: "Please Verify your email to continue"
                })
            );
        } catch (e) {
            handleFailure(dispatch, e);
        } finally {
            dispatch(
                loadingStateActions.setLoadingState({
                    loadingState: loadingStateConst.FULLFILLED,
                })
            );
        }
    }
);

export const logInUser = createAsyncThunk(
    "signUpUser",
    async (userData, { dispatch }) => {

        dispatch(
            loadingStateActions.setLoadingState({
                loadingState: loadingStateConst.PENDING,
            })
        );
        try {
            const response = await axios.post(
                `${url}/auth/authenticate`,
                userData,
            );
            console.log(response)
            localStorage.setItem(localStorageKeys.ACCESS_TOKEN, response.data.accessToken);
            localStorage.setItem(localStorageKeys.REFRESH_TOKEN, response.data.refreshToken);
            localStorage.setItem(localStorageKeys.TYPE, formatRole(response.data.status));
            return {
                user: userData.email,
                type: formatRole(response.data.status),
                authenticated: true
            };
        } catch (e) {
            handleFailure(dispatch, e);

        } finally {
            dispatch(
                loadingStateActions.setLoadingState({
                    loadingState: loadingStateConst.FULLFILLED,
                })
            );
        }
    }
);


export const signOutUser = createAsyncThunk(
    "signOutUser",
    async (_, { dispatch }) => {
        console.log("HERE");

        dispatch(
            loadingStateActions.setLoadingState({
                loadingState: loadingStateConst.PENDING,
            })
        );
        localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
        localStorage.removeItem(localStorageKeys.REFRESH_TOKEN);
        localStorage.removeItem(localStorageKeys.TYPE);
        dispatch(
            loadingStateActions.setLoadingState({
                loadingState: loadingStateConst.SUCCESS,
            })
        );
    }
);
