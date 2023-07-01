import { useEffect } from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { url } from "../constants";

const AccountConfirm = () => {
  const location = useLocation();

  const queryParmas = new URLSearchParams(location.search);
  const token = queryParmas.get("token");
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const val = await axios.get(
        `${url}/auth/accountConfirm/${token}`
      );
      if (val.data && val.data === "Account Verified") {
        history.push("login");
      }
    })();
  }, [token, history]);

 
  return (
    <>
      `account confirm + ${token}`
    </>
  );
};

export default AccountConfirm;
