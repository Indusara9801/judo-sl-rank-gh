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
    <div className={classes["lottie-animation"]} style={{ width }}>
      <Lottie
        animationData={animationData}
        loop={loop}
        play={play}
        height={height}
        width={width}
      />
    </div>
  );
};

export default LottieAnimation;
