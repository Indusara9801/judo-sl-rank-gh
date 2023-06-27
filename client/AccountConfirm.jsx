import { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const AccountConfirm = () => {
  const location = useLocation();

  const queryParmas = new URLSearchParams(location.search);
  const token = queryParmas.get("token");


  useEffect(() => {
    (async () => {
      const val = await axios.get(
        // `http://localhost:8080/auth/accountConfirm/${token}`
        `/api/auth/accountConfirm/${token}`
      );
      if (val.data) {
        localStorage.setItem("accessToken", val.data.accessToken);
        localStorage.setItem("refreshToken", val.data.refreshToken);
      }
    })();
  }, [token]);

  const refreshToken = async () => {
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });

    const url = `http://localhost:8080/auth/refresh`;

    const val = await reqInstance.post(url);

    console.log(val);
  };
  return (
    <>
      `account confirm + ${token}`
      {localStorage.getItem("refreshToken") && (
        <button type="button" onClick={refreshToken}>
          refresh
        </button>
      )}
    </>
  );
};

export default AccountConfirm;
