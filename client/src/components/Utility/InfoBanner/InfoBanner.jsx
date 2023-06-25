import { statusConst } from "../../../constants";
import classes from "./InfoBanner.module.scss";

const InfoBanner = ({ type, message }) => {
  let color;

  switch (type) {
    case statusConst.WARNING:
      color = classes.warning;
      break;
    case statusConst.SUCCESS:
      color = classes.success;
      break;
    case statusConst.ERROR:
      color = classes.error;
      break;
    default:
      color = "";
  }

  return (
    <div className={`${classes.banner} ${color}`}>
      <div className={classes.banner__text}>{message}</div>
    </div>
  );
};

export default InfoBanner;
