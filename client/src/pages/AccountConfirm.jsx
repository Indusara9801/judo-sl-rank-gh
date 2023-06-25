import { useEffect } from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const AccountConfirm = () => {
  const location = useLocation();

  const queryParmas = new URLSearchParams(location.search);
  const token = queryParmas.get("token");
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const val = await axios.get(
        // `http://localhost:8080/auth/accountConfirm/${token}`
        `/api/auth/accountConfirm/${token}`
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
