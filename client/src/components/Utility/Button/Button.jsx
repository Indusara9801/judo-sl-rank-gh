import classes from "./Button.module.scss";

const Button = (props) => {
  const { isDisabled = false, type = "button" } = props;

  return (
    <button
      disabled={isDisabled}
      className={classes[`${props.className}`]}
      onClick={props.onClick}
      type={type}
    >
      {props.title}
    </button>
  );
};

export default Button;
