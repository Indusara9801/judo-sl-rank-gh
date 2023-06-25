import Button from "../Button/Button";
import classes from "./RequestCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loadingStateActions } from "../../../store/loading-state/loading-state";
import { loadingStateConst } from "../../../constants";
import LottieAnimation from "../LottieAnimation/LottieAnimation";

const Request = ({ user }) => {
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.loadingState);
  // const clickHandler = () => {
  //   (async () => {
  //     dispatch(
  //       loadingStateActions.setLoadingState({
  //         loadingState: loadingStateConst.PENDING,
  //       })
  //     );

  //     if (data) {
  //       dispatch(
  //         loadingStateActions.setLoadingState({
  //           loadingState: loadingStateConst.FULLFILLED,
  //         })
  //       );
  //     }
  //     if (error) {
  //       handleFailure(dispatch, error);
  //     }
  //   })();
  // };

  console.log(loadingState);

  return (
    <div className={classes.request}>
      <div className={classes.request__text}>
        <div className="heading-dark-5">{user.player.displayName}</div>
        <div className="heading-dark-7">{user.player.fullName}</div>
      </div>
      <div className={classes.request__button}>
        {loadingState.loadingState === loadingStateConst.PENDING ? (
          <LottieAnimation height={10} width={200} />
        ) : (
          <Button className="btn--primary" title="Accept" />
        )}
      </div>
    </div>
  );
};

export default Request;
