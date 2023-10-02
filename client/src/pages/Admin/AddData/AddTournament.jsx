import Button from "../../../components/Utility/Button/Button";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import {
  femaleWeightMap,
  loadingStateConst,
  maleWeightMap,
  url,
} from "../../../constants";
import LottieAnimation from "../../../components/Utility/LottieAnimation/LottieAnimation";
import axios from "axios";
import DatePicker from "react-datepicker";
import { dateFormatter, handleFailure } from "../../../common";

const divisionMapMale = new Map();
const divisionMapFemale = new Map();

Array.from(maleWeightMap.keys()).forEach((key) =>
  divisionMapMale.set(key, false)
);

Array.from(femaleWeightMap.keys()).forEach((key) =>
  divisionMapFemale.set(key, false)
);

const initialThirdPlaceMatchState = {
  thirdPlaceMatchesMale: divisionMapMale,
  thirdPlaceMatchesFemale: divisionMapFemale,
};

const thirdPlaceMatchStateReducer = (state, action) => {
  switch (action.type) {
    case "CHECKMALE": {
      const newMap = new Map(state.thirdPlaceMatchesMale);
      newMap.set(
        action.payload,
        !state.thirdPlaceMatchesMale.get(action.payload)
      );
      return {
        ...state,
        thirdPlaceMatchesMale: newMap,
      };
    }

    case "CHECKFEMALE": {
      const newMap = new Map(state.thirdPlaceMatchesFemale);
      newMap.set(
        action.payload,
        !state.thirdPlaceMatchesFemale.get(action.payload)
      );
      return {
        ...state,
        thirdPlaceMatchesFemale: newMap,
      };
    }
    case "RESET":
      return initialThirdPlaceMatchState;

    default:
      return initialThirdPlaceMatchState;
  }
};

const AddTournament = () => {
  const loadingState = useSelector((state) => state.loadingState);
  const [tournamentCategories, setTournamentCategories] = useState([]);
  const [tournamentCategory, setTournamentCategory] = useState(null);
  const [tournamentDate, setTournamentDate] = useState(null);
  const [localState, setLocalState] = useState(loadingStateConst.IDLE);
  const [thirdPlaceMatchesState, dispatch] = useReducer(
    thirdPlaceMatchStateReducer,
    initialThirdPlaceMatchState
  );

  const serializeMap = (myMap) =>
    [...myMap].map(([k, v]) => `${k}:${v}`).join(",");

  useEffect(() => {
    (async () => {
      setLocalState(loadingStateConst.PENDING);
      const pointRes = await axios.get(`${url}/points`);
      setTournamentCategories(pointRes.data);
      setLocalState(loadingStateConst.FULLFILLED);
    })();
  }, []);

  const submitHandler = async (event) => {
    setLocalState(loadingStateConst.PENDING);
    event.preventDefault();
    let dateval = dateFormatter(tournamentDate);
    try {
      await axios.post(`${url}/tournaments`, {
        tournament: {
          date: dateval,
          year: new Date(tournamentDate).getFullYear().toString(),
          points: JSON.parse(tournamentCategory),
        },
        thirdPlaceMatchesMale: serializeMap(
          thirdPlaceMatchesState.thirdPlaceMatchesMale
        ),
        thirdPlaceMatchesFemale: serializeMap(
          thirdPlaceMatchesState.thirdPlaceMatchesFemale
        ),
      });
      dispatch({ type: "RESET" });
      setLocalState(loadingStateConst.FULLFILLED);
    } catch (e) {
      handleFailure(dispatch, e);
    } finally {
      setTournamentCategory(null);
      setTournamentDate(null);
      setLocalState(loadingStateConst.FULLFILLED);
    }
  };

  console.log(thirdPlaceMatchesState);

  let formIsValid = false;

  if (tournamentDate !== null && tournamentCategory !== null) {
    formIsValid = true;
  }

  return (
    <Route path="/admin/add/tournament">
      <>
        {localState === loadingStateConst.PENDING ? (
          <>
            <div className="heading-dark-7">
              Please wait while the data loads
            </div>
            <LottieAnimation width={"20rem"} />
          </>
        ) : (
          <div className="add-data__tournament">
            <form
              onSubmit={submitHandler}
              className="add-data__tournament-form"
            >
              <div className="row">
                <div className="col-1">
                  <div className="heading-dark-5">Tournament Category</div>
                  <select
                    className="input__content"
                    value={tournamentCategory}
                    placeholder="Select Gender"
                    onChange={(e) => {
                      setTournamentCategory(e.target.value);
                    }}
                  >
                    <option value={null} selected disabled hidden>
                      Select a tournament
                    </option>
                    {tournamentCategories.map((category) => {
                      return (
                        <option
                          key={category.id}
                          value={JSON.stringify(category)}
                        >
                          {category.tournament}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div className="heading-dark-5">Tournament Date</div>
                </div>
                <div className="col-2">
                  <DatePicker
                    placeholderText="yyyy/mm/dd"
                    className="input__content"
                    dateFormat="yyyy/MM/dd"
                    selected={tournamentDate}
                    onChange={(date) => setTournamentDate(date)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  <div className="heading-dark-5">Third Place Matches</div>
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  <div className="heading-dark-6">Male</div>
                  <div className="row">
                    <div className="col-7">
                      <div className="heading-dark-5">60kg</div>
                      <div className="pl-1">
                        <div className="w-3">
                          <input
                            type="checkbox"
                            name="won"
                            className="input"
                            onChange={() => {
                              dispatch({
                                type: "CHECKMALE",
                                payload: 60,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="heading-dark-5">66kg</div>
                      <div className="pl-1">
                        <div className="w-3">
                          <input
                            type="checkbox"
                            name="won"
                            className="input"
                            onChange={() => {
                              dispatch({
                                type: "CHECKMALE",
                                payload: 66,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="heading-dark-5">73kg</div>
                      <div className="pl-1">
                        <div className="w-3">
                          <input
                            type="checkbox"
                            name="won"
                            className="input"
                            onChange={() => {
                              dispatch({
                                type: "CHECKMALE",
                                payload: 73,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="heading-dark-5">81kg</div>
                      <div className="pl-1">
                        <div className="w-3">
                          <input
                            type="checkbox"
                            name="won"
                            className="input"
                            onChange={() => {
                              dispatch({
                                type: "CHECKMALE",
                                payload: 81,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="heading-dark-5">90kg</div>
                      <div className="pl-1">
                        <div className="w-3">
                          <input
                            type="checkbox"
                            name="won"
                            className="input"
                            onChange={() => {
                              dispatch({
                                type: "CHECKMALE",
                                payload: 90,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="heading-dark-5">-100kg</div>
                      <div className="pl-1">
                        <div className="w-3">
                          <input
                            type="checkbox"
                            name="won"
                            className="input"
                            onChange={() => {
                              dispatch({
                                type: "CHECKMALE",
                                payload: 100,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="heading-dark-5">+100kg</div>
                      <div className="pl-1">
                        <div className="w-3">
                          <input
                            type="checkbox"
                            name="won"
                            className="input"
                            onChange={() => {
                              dispatch({
                                type: "CHECKMALE",
                                payload: 101,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  <div className="heading-dark-6">Female</div>
                  <div className="row">
                    <div className="col-7">
                      <div className="heading-dark-5">48kg</div>
                      <div className="pl-1">
                        <div className="w-3">
                          <input
                            type="checkbox"
                            name="won"
                            className="input"
                            onChange={() => {
                              dispatch({
                                type: "CHECKFEMALE",
                                payload: 48,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="heading-dark-5">52kg</div>
                      <div className="pl-1">
                        <div className="w-3">
                          <input
                            type="checkbox"
                            name="won"
                            className="input"
                            onChange={() => {
                              dispatch({
                                type: "CHECKFEMALE",
                                payload: 52,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="heading-dark-5">57kg</div>
                      <div className="pl-1">
                        <div className="w-3">
                          <input
                            type="checkbox"
                            name="won"
                            className="input"
                            onChange={() => {
                              dispatch({
                                type: "CHECKFEMALE",
                                payload: 57,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="heading-dark-5">63kg</div>
                      <div className="pl-1">
                        <div className="w-3">
                          <input
                            type="checkbox"
                            name="won"
                            className="input"
                            onChange={() => {
                              dispatch({
                                type: "CHECKFEMALE",
                                payload: 63,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="heading-dark-5">70kg</div>
                      <div className="pl-1">
                        <div className="w-3">
                          <input
                            type="checkbox"
                            name="won"
                            className="input"
                            onChange={() => {
                              dispatch({
                                type: "CHECKFEMALE",
                                payload: 70,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="heading-dark-5">-78kg</div>
                      <div className="pl-1">
                        <div className="w-3">
                          <input
                            type="checkbox"
                            name="won"
                            className="input"
                            onChange={() => {
                              dispatch({
                                type: "CHECKFEMALE",
                                payload: 78,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="heading-dark-5">+78kg</div>
                      <div className="pl-1">
                        <div className="w-3">
                          <input
                            type="checkbox"
                            name="won"
                            className="input"
                            onChange={() => {
                              dispatch({
                                type: "CHECKFEMALE",
                                payload: 79,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                {loadingState.loadingState === loadingStateConst.PENDING ? (
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
          </div>
        )}
      </>
    </Route>
  );
};

export default AddTournament;
