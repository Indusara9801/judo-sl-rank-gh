import Lottie from "react-lottie-player";
import loadingAnimation from "../../../lotties/loading.json";
import classes from "./LottieAnimation.module.scss";

const LottieAnimation = ({
  animationData = loadingAnimation,
  height,
  width,
  loop = true,
  play = true,
}) => {
  return (
    <Lottie
      className={classes["lottie-animation"]}
      animationData={animationData}
      loop={loop}
      play={play}
    />
  );
};

export default LottieAnimation;
