import "./App.scss";
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
import AccountConfirm from "./pages/AccountConfirm";
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
import Tournaments from "./pages/Admin/Tournaments";

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
        <Route path="/signup">
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
        <Route path="/admin/tournaments">
          <Tournaments />
        </Route>
      </Switch>
    </>
  );
}

export default App;
