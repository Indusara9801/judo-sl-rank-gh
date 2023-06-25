import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { loadingStateConst, statusConst, genderList } from "../constants";
import Button from "../components/Utility/Button/Button";
import InfoBanner from "../components/Utility/InfoBanner/InfoBanner";
import Input from "../components/Utility/Input/Input";
import LottieAnimation from "../components/Utility/LottieAnimation/LottieAnimation";
import { userActions } from "../store/user/user";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddUserInfo = () => {
  const [displayNameIsValid, setDisplayNameIsValid] = useState(false);
  const [dob, setDob] = useState(new Date());
  const [fullNameIsValid, setFullNameIsValid] = useState(false);
  const [gender, setGender] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const status = useSelector((state) => state.status);
  const loadingState = useSelector((state) => state.loadingState);
  const displayNameRef = useRef();
  const fullNameRef = useRef();

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

  if (
    displayNameIsValid &&
    fullNameIsValid &&
    dob !== null &&
    gender !== null
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      dispatch(
        userActions.addUserInfo({
          displayName: displayNameRef.current.value,
          fullName: fullNameRef.current.value,
          gender: gender,
          dob: dob,
        })
      );
      history.push("/signup/playerInfo");
    }

    displayNameRef.current.reset();
    fullNameRef.current.reset();
  };



  
  

  return (
    <main>
      <section id="section-userInfo">
        <div className="userInfo-container">
          <div className="userInfo-container__heading">
            <div className="heading-dark-3">Sign Up</div>
          </div>
          <form
            onSubmit={formSubmissionHandler}
            className="userInfo-container__form"
          >
            {status.status !== statusConst.NONE && (
              <InfoBanner type={status.status} message={status.message} />
            )}
            <div className="userInfo-container__input">
              <Input
                validator={fullNameValidator}
                checkValidity={checkFullNameValidity}
                ref={fullNameRef}
                id="fullName"
                label="Full Name"
                errorMessage="Full name cannot not be empty"
              />

              <div className="userInfo-container__split">
                <div className="userInfo-container__row">
                  <div className="heading-dark-5">DOB</div>
                  <DatePicker
                    className="userInfo-container__row__input"
                    dateFormat="yyyy/MM/dd"
                    selected={dob}
                    onChange={(date) => setDob(date)}
                  />
                </div>

                <div className="userInfo-container__row">
                  <div className="heading-dark-5">Gender</div>
                  <select
                    className="userInfo-container__row__input"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    {genderList.map((option) => {
                      return (
                        <option value={option.value}>{option.label}</option>
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
            </div>

            <div className="userInfo-container__buttons">
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

export default AddUserInfo;
