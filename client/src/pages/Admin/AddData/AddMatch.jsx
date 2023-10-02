import Button from "../../../components/Utility/Button/Button";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { loadingStateActions } from "../../../store/loading-state/loading-state";
import {
  loadingStateConst,
  url,
  maleWeightClassList,
  femaleWeightClassList,
  genderList,
  colors,
} from "../../../constants";
import LottieAnimation from "../../../components/Utility/LottieAnimation/LottieAnimation";
import axios from "axios";
import { handleFailure } from "../../../common";
import TabBar from "../../../components/TabBar/TabBar";
import Input from "../../../components/Utility/Input/Input";
import SearchDorpDown from "../../../components/SearchDropDown/SearchDropDown";

const AddMatch = () => {
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.loadingState);
  const [year, setYear] = useState(new Date().getFullYear());
  const yearList = [2023, 2022, 2021, 2020];
  const [players, setPalyers] = useState([]);
  const [tournamentlist, setTournamentList] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [localState, setLocalState] = useState(loadingStateConst.IDLE);
  const [matchNameIsValid, setMatchNameIsValid] = useState(null);
  const [gender, setGender] = useState(null);
  const [weightClass, setWeightClass] = useState(null);
  const matchNameRef = useRef();

  const [tier, setTier] = useState(null);

  const [timeMinuites, setTimeMinuites] = useState(null);
  const [timeSeconds, setTimeSeconds] = useState(null);

  const [player1Color, setPlayer1Color] = useState(null);
  const [player2Color, setPlayer2Color] = useState(null);

  const [player1Ippon, setPlayer1Ippon] = useState(null);
  const [player1WasaAri, setPlayer1WasaAri] = useState(null);
  const [player1Shido, setPlayer1Shido] = useState(null);

  const [player2Ippon, setPlayer2Ippon] = useState(null);
  const [player2WasaAri, setPlayer2WasaAri] = useState(null);
  const [player2Shido, setPlayer2Shido] = useState(null);

  const [winner, setWinner] = useState(null);

  const player1Ref = useRef();
  const player2Ref = useRef();

  const matchNameValidator = (value) =>
    value.trim() !== "" && value.trim().length > 0;

  const matchNameValidity = (validity) => {
    setMatchNameIsValid(validity);
  };

  useEffect(() => {
    (async () => {
      setLocalState(loadingStateConst.PENDING);
      const res = await axios.get(`${url}/tournaments/${year}`);
      setTournamentList(res.data);
      setLocalState(loadingStateConst.FULLFILLED);
    })();
  }, [year]);

  useEffect(() => {
    (async () => {
      setLocalState(loadingStateConst.PENDING);
      const res = await axios.get(`${url}/admin/users`);
      setPalyers(res.data);
      setLocalState(loadingStateConst.FULLFILLED);
    })();
  }, []);

  let formIsValid = false;

  if (
    tournament !== null &&
    matchNameIsValid &&
    gender !== null &&
    weightClass !== null &&
    tier !== null &&
    timeMinuites !== null &&
    timeSeconds !== null &&
    player1Color !== null &&
    player1Ippon !== null &&
    player1WasaAri !== null &&
    player1Shido !== null &&
    player2Color !== null &&
    player2Ippon !== null &&
    player2WasaAri !== null &&
    player2Shido !== null &&
    player1Ref.current.value.trim().length > 0 &&
    player2Ref.current.value.trim().length > 0
  ) {
    formIsValid = true;
  }

  console.log(
    tournament !== null &&
      matchNameIsValid &&
      gender !== null &&
      weightClass !== null &&
      tier !== null &&
      timeMinuites !== null &&
      timeSeconds !== null &&
      player1Color !== null &&
      player1Ippon !== null &&
      player1WasaAri !== null &&
      player1Shido !== null &&
      player2Color !== null &&
      player2Ippon !== null &&
      player2WasaAri !== null &&
      player2Shido !== null &&
      winner !== null &&
      player1Ref.current.value.trim().length > 0 &&
      player2Ref.current.value.trim().length > 0
  );

  const setAllToNull = () => {
    matchNameRef.current.reset();
    setGender(null);
    setWeightClass(null);
    setTier(null);
    setTimeMinuites(null);
    setTimeSeconds(null);
    setPlayer1Color(null);
    setPlayer1Ippon(null);
    setPlayer1WasaAri(null);
    setPlayer1Shido(null);
    setPlayer2Color(null);
    setPlayer2Ippon(null);
    setPlayer2WasaAri(null);
    setPlayer2Shido(null);
    setWinner(null);
    player1Ref.current.reset();
    player2Ref.current.reset();
  };

  const tabHandler = (value) => {
    setAllToNull();
    setYear(value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const tournamentId = JSON.parse(tournament).id;
    const matchData = {
      match: {
        name: matchNameRef.current.value,
        time: timeMinuites * 60 + timeSeconds * 1,
        tier: tier,
        matchPlayer1: {
          playerId: player1Ref.current.value,
          won: winner === "player1",
          ippon: player1Ippon,
          penalty: player1Shido,
          wasaAri: player1WasaAri,
          playerInDb: player1Ref.current.inDB,
          color: player1Color,
        },
        matchPlayer2: {
          playerId: player2Ref.current.value,
          won: winner === "player2",
          ippon: player2Ippon,
          penalty: player2Shido,
          wasaAri: player2WasaAri,
          playerInDb: player2Ref.current.inDB,
          color: player2Color,
        },
      },
      tournamentId: tournamentId,
      weightClass: weightClass,
      gender: gender,
    };
    console.log(matchData);
    try {
      await axios.post(`${url}/match`, matchData);
      dispatch(
        loadingStateActions.setLoadingState({
          loadingState: loadingStateConst.FULLFILLED,
        })
      );
    } catch (e) {
      handleFailure(dispatch, e);
    } finally {
      setAllToNull();
      dispatch(
        loadingStateActions.setLoadingState({
          loadingState: loadingStateConst.FULLFILLED,
        })
      );
    }
  };

  return (
    <Route path="/admin/add/match">
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
            <TabBar
              valueList={yearList}
              onClickRadio={tabHandler}
              defaultVal={2023}
              width="10rem"
            />
            {localState === loadingStateConst.PENDING ? (
              <LottieAnimation width={"20rem"} />
            ) : (
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
                    <Input
                      validator={matchNameValidator}
                      checkValidity={matchNameValidity}
                      ref={matchNameRef}
                      id="matchName"
                      label="Match Name"
                      errorMessage="Match name cannot not be empty"
                    />
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
                  <div className="col-1">
                    <div className="heading-dark-5">Tier</div>
                    <input
                      type="number"
                      min="0"
                      className="input"
                      value={tier}
                      onChange={(e) => {
                        setTier(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-1">
                    <div className="heading-dark-5">Time</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <div className="pr-1">
                      <div className="heading-dark-5">Minuites</div>
                      <input
                        type="number"
                        max="60"
                        min="0"
                        className="input"
                        value={timeMinuites}
                        onChange={(e) => {
                          setTimeMinuites(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="pr-1">
                      <div className="heading-dark-5">Seconds</div>
                      <input
                        type="number"
                        max="60"
                        min="0"
                        className="input"
                        value={timeSeconds}
                        onChange={(e) => {
                          setTimeSeconds(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-1">
                    <div className="heading-dark-5">Player 1</div>
                    <SearchDorpDown data={players} ref={player1Ref} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-1">
                    <div className="heading-dark-5">Color</div>
                    <select
                      className="input"
                      value={player1Color}
                      onChange={(e) => {
                        setPlayer1Color(e.target.value);
                      }}
                    >
                      <option value={null} selected disabled hidden>
                        Select Color
                      </option>
                      {colors.map((option, index) => {
                        return (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="pr-1">
                      <div className="heading-dark-5">Ippon</div>
                      <input
                        type="number"
                        max="1"
                        min="0"
                        className="input"
                        value={player1Ippon}
                        onChange={(e) => {
                          setPlayer1Ippon(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="pr-1">
                      <div className="heading-dark-5">Wasaari</div>
                      <input
                        type="number"
                        max="1"
                        min="0"
                        className="input"
                        value={player1WasaAri}
                        onChange={(e) => {
                          setPlayer1WasaAri(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="heading-dark-5">Penalty</div>
                    <input
                      type="number"
                      max="3"
                      min="0"
                      className="input"
                      value={player1Shido}
                      onChange={(e) => {
                        setPlayer1Shido(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-4">
                    <div className="pl-1">
                      <div className="heading-dark-5">Won</div>
                      <div className="w-3">
                        <input
                          type="radio"
                          className="input"
                          value="player1"
                          name="won"
                          checked={winner === "player1"}
                          onChange={(e) => {
                            setWinner(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-1">
                    <div className="heading-dark-5">Player 2</div>
                    <SearchDorpDown data={players} ref={player2Ref} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-1">
                    <div className="heading-dark-5">Color</div>
                    <select
                      className="input"
                      value={player2Color}
                      onChange={(e) => {
                        setPlayer2Color(e.target.value);
                      }}
                    >
                      <option value={null} selected disabled hidden>
                        Select Color
                      </option>
                      {colors.map((option, index) => {
                        return (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="pr-1">
                      <div className="heading-dark-5">Ippon</div>
                      <input
                        type="number"
                        max="1"
                        min="0"
                        className="input"
                        value={player2Ippon}
                        onChange={(e) => {
                          setPlayer2Ippon(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="pr-1">
                      <div className="heading-dark-5">Wasaari</div>
                      <input
                        type="number"
                        max="1"
                        min="0"
                        className="input"
                        value={player2WasaAri}
                        onChange={(e) => {
                          setPlayer2WasaAri(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="heading-dark-5">Penalty</div>
                    <input
                      type="number"
                      max="3"
                      min="0"
                      className="input"
                      value={player2Shido}
                      onChange={(e) => {
                        setPlayer2Shido(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-4">
                    <div className="pl-1">
                      <div className="heading-dark-5">Won</div>
                      <div className="w-3">
                        <input
                          type="radio"
                          name="won"
                          value="player2"
                          className="input"
                          checked={winner === "player2"}
                          onChange={(e) => {
                            setWinner(e.target.value);
                          }}
                        />
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
            )}
          </div>
        )}
      </>
    </Route>
  );
};

export default AddMatch;
