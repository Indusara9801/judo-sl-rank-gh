import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  loadingStateConst,
  statusConst,
  genderList,
  maleWeightClassList,
  femaleWeightClassList,
  provinceList,
  judoGradeList,
} from "../constants";
import Button from "../components/Utility/Button/Button";
import InfoBanner from "../components/Utility/InfoBanner/InfoBanner";
import Input from "../components/Utility/Input/Input";
import LottieAnimation from "../components/Utility/LottieAnimation/LottieAnimation";
import { signUpUser } from "../store/user/user-actions";

const SignUp = () => {
  const [displayNameIsValid, setDisplayNameIsValid] = useState(false);
  const [dob, setDob] = useState(null);
  const [fullNameIsValid, setFullNameIsValid] = useState(false);
  const [gender, setGender] = useState(null);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [clubNameIsValid, setClubNameIsValid] = useState(false);
  const [province, setProvince] = useState(null);
  const [judoGrade, setJudoGrade] = useState(null);
  const [weightClass, setWeightClass] = useState(null);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);
  const loadingState = useSelector((state) => state.loadingState);
  const displayNameRef = useRef();
  const fullNameRef = useRef();
  const clubNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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

  const checkDisplayNameValidity = (validity) => {
    setDisplayNameIsValid(validity);
  };

  const checkFullNameValidity = (validity) => {
    setFullNameIsValid(validity);
  };

  const displayNameValidator = (value) =>
    value.trim() !== "" && value.trim().length > 6;

  const fullNameValidator = (value) =>
    value.trim() !== "" && value.trim().length > 0;

  let formIsValid = false;

  console.log(status);
  console.log(loadingState);

  const dateFormatter = (date) => {
    return new Date(date).toLocaleString("sv").split(" ")[0].toString();
  };

  if (
    displayNameIsValid &&
    fullNameIsValid &&
    dob !== null &&
    gender !== null &&
    passwordIsValid &&
    emailIsValid &&
    clubNameIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    let dateval = dateFormatter(dob);
    console.log({
      displayName: displayNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      fullName: fullNameRef.current.value,
      gender: gender.toUpperCase(),
      dob: dateval,
      clubName: clubNameRef.current.value,
      judoGrade: judoGrade.toUpperCase(),
      weightClass: weightClass,
      province: province.toUpperCase(),
    });

    if (formIsValid) {
      dispatch(
        signUpUser({
          displayName: displayNameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          fullName: fullNameRef.current.value,
          gender: gender,
          dob: dateval,
          clubName: clubNameRef.current.value,
          judoGrade: judoGrade,
          weightClass: weightClass,
          province: province,
        })
      );
    }

    displayNameRef.current.reset();
    fullNameRef.current.reset();
    emailRef.current.reset();
    passwordRef.current.reset();
    clubNameRef.current.reset();
  };

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
                validator={fullNameValidator}
                checkValidity={checkFullNameValidity}
                ref={fullNameRef}
                id="fullName"
                label="Full Name"
                errorMessage="Full name cannot not be empty"
              />

              <Input
                validator={clubNameValidator}
                checkValidity={checkClubNameValidity}
                ref={clubNameRef}
                id="clubName"
                label="Club Name"
                errorMessage="Club cannot not be empty"
              />

              <div className="signup-container__split">
                <div className="signup-container__row">
                  <div className="heading-dark-5">DOB</div>
                  <DatePicker
                    placeholderText="yyyy/mm/dd"
                    className="signup-container__row__input"
                    dateFormat="yyyy/MM/dd"
                    selected={dob}
                    onChange={(date) => setDob(date)}
                  />
                </div>

                <div className="signup-container__row">
                  <div className="heading-dark-5">Gender</div>
                  <select
                    className="signup-container__row__input"
                    value={gender}
                    placeholder="Select Gender"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setWeightClass(null);
                    }}
                  >
                    <option value={null} selected disabled hidden>
                      Select a Gender
                    </option>
                    {genderList.map((option, index) => {
                      return (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="signup-container__row">
                  <div className="heading-dark-5">Weight Class</div>
                  <select
                    disabled={gender == null}
                    className="signup-container__row__input"
                    value={weightClass}
                    onChange={(e) => {
                      setWeightClass(e.target.value);
                    }}
                  >
                    <option value={null} selected disabled hidden>
                      Select a Weight class
                    </option>
                    {gender === "male"
                      ? maleWeightClassList.map((option, index) => {
                          return (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          );
                        })
                      : femaleWeightClassList.map((option, index) => {
                          return (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          );
                        })}
                  </select>
                </div>
              </div>

              <div className="signup-container__split">
                <div className="signup-container__row">
                  <div className="heading-dark-5">Province</div>
                  <select
                    className="signup-container__row__input"
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                    }}
                  >
                     <option value={null} selected disabled hidden>
                      Select a province
                    </option>
                    {provinceList.map((option, index) => {
                      return (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="signup-container__row">
                  <div className="heading-dark-5">Judo Grade</div>
                  <select
                    className="signup-container__row__input"
                    value={judoGrade}
                    onChange={(e) => {
                      setJudoGrade(e.target.value);
                    }}
                  >
                     <option value={null} selected disabled hidden>
                      Select a judo grade
                    </option>
                    {judoGradeList.map((option, index) => {
                      return (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <Input
                validator={displayNameValidator}
                checkValidity={checkDisplayNameValidity}
                ref={displayNameRef}
                id="displayName"
                label="Display Name"
                errorMessage="Display name cannot not be empty or less than 6 characters"
              />
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
                  title={"Finish Signup"}
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
