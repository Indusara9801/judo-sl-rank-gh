import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { loadingStateConst, statusConst, userTypes } from "../constants";

import Button from "../components/Utility/Button/Button";
import InfoBanner from "../components/Utility/InfoBanner/InfoBanner";
import Input from "../components/Utility/Input/Input";
import LottieAnimation from "../components/Utility/LottieAnimation/LottieAnimation";
import { logInUser } from "../store/user/user-actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);
  const loadingState = useSelector((state) => state.loadingState);
  const user = useSelector((state) => state.user);
  const emailRef = useRef();
  const passwordRef = useRef();
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const checkEmailValidity = (validity) => {
    setEmailIsValid(validity);
  };

  const checkPasswordValidity = (validity) => {
    setPasswordIsValid(validity);
  };

  const emailValidator = (value) =>
    value.trim() !== "" && validRegex.test(value);

  const passwordValidator = (value) =>
    value.trim() !== "" && value.trim().length > 6;

  let formIsValid = false;

  console.log(user.authenticated);
  console.log(loadingState);

  if (passwordIsValid && emailIsValid) {
    formIsValid = true;
  }

  if (user && user.authenticated) {
    if (user.type === userTypes.ADMIN) {
      history.push("admin");
    }
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      console.log(emailRef.current.value, passwordRef.current.value);
      dispatch(
        logInUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }

    emailRef.current.reset();
    passwordRef.current.reset();
  };

  return (
    <main>
      <section id="section-login">
        <div className="login-container">
          <div className="login-container__heading">
            <div className="heading-dark-3">Login</div>
          </div>
          <form
            onSubmit={formSubmissionHandler}
            className="login-container__form"
          >
            {status.status !== statusConst.NONE && (
              <InfoBanner type={status.status} message={status.message} />
            )}
            <div className="login-container__input">
              <Input
                validator={emailValidator}
                checkValidity={checkEmailValidity}
                ref={emailRef}
                id="email"
                label="Email"
                errorMessage="Email is not valid"
              />
              <Input
                validator={passwordValidator}
                checkValidity={checkPasswordValidity}
                ref={passwordRef}
                id="password"
                label="Password"
                type="password"
                errorMessage="Password cannot be empty"
              />
            </div>

            <div className="login-container__buttons">
              {loadingState.loadingState === loadingStateConst.PENDING ? (
                <LottieAnimation width={"20rem"} />
              ) : (
                <Button
                  className={"btn--primary"}
                  isDisabled={!formIsValid}
                  type={"submit"}
                  title={"Login"}
                />
              )}
              <p className="heading-dark-6">
                Not a member? &nbsp;
                <span>
                  <Link to={"/signup"}>Sign Up</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
