import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import supabase from "../lib/supabaseClient";

import { loadingStateActions } from "../store/loading-state/loading-state";
import { loadingStateConst } from "../constants";

const useAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      dispatch(
        loadingStateActions.setLoadingState({
          loadingState: loadingStateConst.PENDING,
        })
      );
      const session = await supabase.auth.getSession();

      console.log(session);

      if (session.data.session !== null) {
        const { data } = await supabase
          .from("profiles")
          .select("admin, displayName, payment")
          .eq("id", session.data.session.user.id);
        const currentUser = data[0];
        if (currentUser.admin) {
          history.push("/admin");
          dispatch(
            loadingStateActions.setLoadingState({
              loadingState: loadingStateConst.FULLFILLED,
            })
          );
        } else {
          if (currentUser.payment) {
            history.push("/home");
            dispatch(
              loadingStateActions.setLoadingState({
                loadingState: loadingStateConst.FULLFILLED,
              })
            );
          } else {
            history.push("/payment");
            dispatch(
              loadingStateActions.setLoadingState({
                loadingState: loadingStateConst.FULLFILLED,
              })
            );
          }
        }
      } else {
        history.push("/login");
        dispatch(
          loadingStateActions.setLoadingState({
            loadingState: loadingStateConst.FULLFILLED,
          })
        );
      }

    })();
  }, [dispatch, history]);
};

export default useAuth;
