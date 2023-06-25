import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import {
  loadingStateConst,
  statusConst,
  maleWeightClassList,
  femaleWeightClassList,
  judoGradeList,
  provinceList,
} from "../constants";

import Button from "../components/Utility/Button/Button";
import InfoBanner from "../components/Utility/InfoBanner/InfoBanner";
import Input from "../components/Utility/Input/Input";
import LottieAnimation from "../components/Utility/LottieAnimation/LottieAnimation";
import { userActions } from "../store/user/user";
import { signUpUser } from "../store/user/user-actions";

const SignUp = () => {
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [clubNameIsValid, setClubNameIsValid] = useState(false);
  const [province, setProvince] = useState(null);
  const [judoGrade, setJudoGrade] = useState(null);
  const [weightClass, setWeightClass] = useState(null);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);
  const loadingState = useSelector((state) => state.loadingState);
  const userDetails = useSelector((state) => state.user.user);
  const clubNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const weightClassList =
    userDetails.gender === "male" ? maleWeightClassList : femaleWeightClassList;

  const checkClubNameValidity = (validity) => {
    setClubNameIsValid(validity);
  };

  const checkEmailValidity = (validity) => {
    setEmailIsValid(validity);
  };

  const checkPasswordValidity = (validity) => {
    setPasswordIsValid(validity);
  };

  const clubNameValidator = (value) =>
    value.trim() !== "" && value.trim().length > 0;

  const emailValidator = (value) =>
    value.trim() !== "" && validRegex.test(value);

  const passwordValidator = (value) =>
    value.trim() !== "" && value.trim().length > 6;

  let formIsValid = false;

  console.log(status);
  console.log(loadingState);

  if (passwordIsValid && emailIsValid && clubNameIsValid) {
    formIsValid = true;
  }

  const dateFormatter = (date) => {
    return new Date(date).toLocaleString("sv").split(" ")[0].toString();
  }

  

  const formSubmissionHandler = (event) => {
    event.preventDefault();

   
    let dateval = dateFormatter(userDetails.dob);
    
    if (formIsValid) {
      console.log(emailRef.current.value, passwordRef.current.value);
      dispatch(
        signUpUser({
          displayName: userDetails.displayName,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          fullName: userDetails.fullName,
          gender: userDetails.gender,
          dob: dateval,
          clubName: clubNameRef.current.value,
          judoGrade: judoGrade,
          weightClass: weightClass,
          province: province,
        })
      );
    }

    dispatch(userActions.clearUser());
    emailRef.current.reset();
    passwordRef.current.reset();
    clubNameRef.current.reset();
  };

  console.log(userDetails);
  return (
    <main>
      <section id="section-signup">
        <div className="signup-container">
          <div className="signup-container__heading">
            <div className="heading-dark-3">Sign Up</div>
          </div>
          <form
            onSubmit={formSubmissionHandler}
            className="signup-container__form"
          >
            {status.status !== statusConst.NONE && (
              <InfoBanner type={status.status} message={status.message} />
            )}
            <div className="signup-container__input">
              <Input
                validator={clubNameValidator}
                checkValidity={checkClubNameValidity}
                ref={clubNameRef}
                id="clubName"
                label="Club Name"
                errorMessage="Club cannot not be empty"
              />
              <div className="signup-container__split">
                <div className="signup-container__row--full">
                  <div className="heading-dark-5">Province</div>
                  <select
                    className="signup-container__row__input"
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                    }}
                  >
                    {provinceList.map((option, index) => {
                      return <option key={index} value={option}>{option}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="signup-container__split">
                <div className="signup-container__row">
                  <div className="heading-dark-5">Judo Grade</div>
                  <select
                    className="signup-container__row__input"
                    value={judoGrade}
                    onChange={(e) => {
                      setJudoGrade(e.target.value);
                    }}
                  >
                    {judoGradeList.map((option, index) => {
                      return <option key={index} value={option}>{option}</option>;
                    })}
                  </select>
                </div>
                <div className="signup-container__row">
                  <div className="heading-dark-5">Weight Class</div>
                  {weightClassList === null ? (
                    <select
                      className="signup-container__row__input"
                      disabled
                    ></select>
                  ) : (
                    <select
                      className="signup-container__row__input"
                      value={weightClass}
                      onChange={(e) => {
                        setWeightClass(e.target.value);
                      }}
                    >
                      {weightClassList.map((option, index) => {
                        return <option key={index} value={option}>{option}</option>;
                      })}
                    </select>
                  )}
                </div>
              </div>

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
                errorMessage="Password cannot not be empty or less than 6 characters"
              />
            </div>

            <div className="signup-container__buttons">
              {loadingState.loadingState === loadingStateConst.PENDING ? (
                <LottieAnimation height={20} width={400} />
              ) : (
                <Button
                  className={"btn--primary"}
                  isDisabled={!formIsValid}
                  type={"submit"}
                  title={"Signup"}
                />
              )}
              <p className="heading-dark-6">
                Already a member? &nbsp;
                <span>
                  <Link to={"/login"}>Log In</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
