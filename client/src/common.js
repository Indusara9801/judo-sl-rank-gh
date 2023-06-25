import { loadingStateActions } from "./store/loading-state/loading-state";
import { statusActions } from "./store/status/status";
import { apiErrors, loadingStateConst, statusConst } from "./constants";

const errorKeys = [...apiErrors.keys()];

export const handleFailure = (dispatch, err, reject) => {
  if (reject) reject(err.message);
  dispatch(
    loadingStateActions.setLoadingState({
      loadingState: loadingStateConst.ERROR,
    })
  );

  if (errorKeys.includes(err.code)) {
    dispatch(
      statusActions.setStatus({
        status: statusConst.ERROR,
        message: apiErrors.get(err.code),
      })
    );
  } else {
    dispatch(
      statusActions.setStatus({
        status: statusConst.ERROR,
        message: err.message,
      })
    );
  }
};

export const formatRole = (roleString) => {
  return roleString.replace(/\[|\]/g,'');
}
