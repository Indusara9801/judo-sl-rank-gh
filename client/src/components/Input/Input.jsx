import { forwardRef, useEffect, useImperativeHandle } from "react";
import useInput from "../../hooks/use-input";
import classes from "./Input.module.scss";

const Input = forwardRef((props, ref) => {
  const {
    value,
    hasError,
    isValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  } = useInput(props.validator);

  useEffect(() => {
    props.checkValidity(isValid);
  }, [isValid, props]);

  useImperativeHandle(ref, () => {
    return {
      reset,
      value,
    };
  });

  const { type = "text" } = props;

  return (
    <>
      <div
        className={`${classes["form-control"]} ${hasError && classes.invalid}`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
          type={type}
          id={props.id}
          onChange={valueChangeHandler}
          onBlur={inputBlurHandler}
          value={value}
          ref={ref}
        />
        {hasError && (
          <p className={classes["error-text"]}>{props.errorMessage}</p>
        )}
      </div>
    </>
  );
});

export default Input;
