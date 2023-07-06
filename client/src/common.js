import { statusActions } from "./store/status/status";
import { errorTypes, statusConst } from "./constants";



export const handleFailure = (dispatch, e) => {
  console.log(e);
  if (Object.prototype.hasOwnProperty.call(errorTypes, e.response.data.title)) {
    dispatch(
      statusActions.setStatus({
        status: statusConst.ERROR,
        message: e.response.data.message
      })
    );
  } else {
    dispatch(
      statusActions.setStatus({
        status: statusConst.ERROR,
        message: e.message
      })
    );
  }
};

export const formatRole = (roleString) => {
  return roleString.replace(/\[|\]/g, '');
}
