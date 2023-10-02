import { useState, useEffect } from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { loadingStateConst } from "../../../constants";
import LottieAnimation from "../../../components/Utility/LottieAnimation/LottieAnimation";
import {
  genderList,
  maleWeightClassList,
  femaleWeightClassList,
  url,
} from "../../../constants";
import axios from "axios";
import TabBar from "../../../components/TabBar/TabBar";
import Button from "../../../components/Utility/Button/Button";
import { handleFailure } from "../../../common";
import { useDispatch } from "react-redux";

const CalculatePositions = () => {
  const [localState, setLocalState] = useState(loadingStateConst.IDLE);
  const [gender, setGender] = useState(null);
  const [weightClass, setWeightClass] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const yearList = [2023, 2022, 2021, 2020];
  const [tournamentlist, setTournamentList] = useState([]);
  const [tournament, setTournament] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLocalState(loadingStateConst.PENDING);
      const res = await axios.get(`${url}/tournaments/${year}`);
      setTournamentList(res.data);
      setLocalState(loadingStateConst.FULLFILLED);
    })();
  }, [year]);

  let formIsValid = false;

  if (tournament !== null && gender !== null && weightClass !== null) {
    formIsValid = true;
  }

  const setAllToNull = () => {
    setGender(null);
    setWeightClass(null);
  };

  const tabHandler = (value) => {
    setAllToNull();
    setYear(value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLocalState(loadingStateConst.PENDING);
    const tournamentId = JSON.parse(tournament).id;
    try {
      await axios.post(
        `${url}/participate/${tournamentId}/${gender}/${weightClass}`
      );
      setLocalState(loadingStateConst.FULLFILLED);
    } catch (e) {
      handleFailure(dispatch, e);
    } finally {
      setAllToNull();
      setLocalState(loadingStateConst.FULLFILLED);
    }
  };
  return (
    <Route path="/admin/add/positions">
      {localState === loadingStateConst.PENDING ? (
        <>
          <div className="heading-dark-7">Please wait while the data loads</div>
          <LottieAnimation width={"20rem"} />
        </>
      ) : (
        <div className="add-data__tournament">
          <TabBar
            valueList={yearList}
            onClickRadio={tabHandler}
            defaultVal={2023}
            width="10rem"
          />
          {localState === loadingStateConst.PENDING ? (
            <LottieAnimation width={"20rem"} />
          ) : (
            <>
              <form
                onSubmit={submitHandler}
                className="add-data__tournament-form"
              >
                <div className="row">
                  <div className="col-1">
                    <div className="heading-dark-5">Tournament</div>
                    <select
                      className="input__content"
                      value={tournament}
                      placeholder="Select Gender"
                      onChange={(e) => {
                        setTournament(e.target.value);
                      }}
                    >
                      <option value={null} selected disabled hidden>
                        Select a tournament
                      </option>
                      {tournamentlist.map((category) => {
                        return (
                          <option
                            key={category.id}
                            value={JSON.stringify(category)}
                          >
                            {`${
                              category.points.tournament
                            } (${category.date.toString()})`}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-1">
                    <div className="heading-dark-5">Gender</div>
                    <select
                      className="input"
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
                </div>
                <div className="row">
                  <div className="col-1">
                    <div className="heading-dark-5">Weight Class</div>
                    <select
                      disabled={gender == null}
                      className="input"
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
                              <option key={index} value={option.value}>
                                {option.label}
                              </option>
                            );
                          })
                        : femaleWeightClassList.map((option, index) => {
                            return (
                              <option key={index} value={option.value}>
                                {option.label}
                              </option>
                            );
                          })}
                    </select>
                  </div>
                </div>

                <div className="row">
                  {localState === loadingStateConst.PENDING ? (
                    <LottieAnimation width={"20rem"} />
                  ) : (
                    <Button
                      className={"btn--primary"}
                      isDisabled={!formIsValid}
                      type={"submit"}
                      title={"Add Tournament"}
                    />
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </Route>
  );
};

export default CalculatePositions;
