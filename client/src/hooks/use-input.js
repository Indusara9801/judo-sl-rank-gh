import { useReducer } from "react";

import { inputActions } from "../constants";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case inputActions.INPUT:
      return {
        ...state,
        value: action.payload,
      };
    case inputActions.BLUR:
      return {
        ...state,
        isTouched: true,
      };
    case inputActions.RESET:
      return {
        value: "",
        isTouched: false,
      };
    default:
      return initialInputState;
  }
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: inputActions.INPUT, payload: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: inputActions.BLUR });
  };

  const reset = () => {
    dispatch({ type: inputActions.RESET });
  };

  return {
    value: inputState.value,
    hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
