import "./App.scss";
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
import AccountConfirm from "./pages/AccountConfirm";
import AddUserInfo from "./pages/UserInfo";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import Players from "./pages/Admin/Players";
import Player from "./pages/Admin/Player";
import Requests from "./pages/Admin/Requests";
import Tournament from "./pages/Tournament";
import axios from "axios";
import { localStorageKeys } from "./constants";

function App() {
  axios.interceptors.request.use((config) => {
    const data = config.url.split("/");
    config.headers["Content-Type"] = "application/json";
    if (!data.includes("auth")) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        localStorageKeys.ACCESS_TOKEN
      )}`;
    }
    console.log("INTERCEPTED --> ", config);
    return config;
  });
  axios.interceptors.response.use(async (config) => {
    return config;
  });
  return (
    <>
      <Switch>
        <Route path="/accountConfirm">
          <AccountConfirm />
        </Route>
        <Route path="/signup/userInfo">
          <AddUserInfo />
        </Route>
        <Route path="/signup/playerInfo">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin" exact>
          <Redirect to="/admin/players" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup/userInfo">
          <AddUserInfo />
        </Route>
        <Route path="/signup/playerInfo">
          <SignUp />
        </Route>
        <Route path="/admin/players" exact>
          <Players />
        </Route>
        <Route path="/admin/players/:id" exact>
          <Player />
        </Route>
        <Route path="/admin/tournament">
          <Tournament />
        </Route>
        <Route path="/admin/requests">
          <Requests />
        </Route>
      </Switch>
    </>
  );
}

export default App;
