import LottieAnimation from "../components/Utility/LottieAnimation/LottieAnimation";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadingStateActions } from "../store/loading-state/loading-state";
import { loadingStateConst } from "../constants";

import Header from "../components/Header/Header";
import TabBar from "../components/TabBar/TabBar";
import MatchCard from "../components/Utility/MatchCard/MatchCard";
import axios from "axios";
import { url } from "../constants";
import DivisionPicker from "../components/DivisionPicker/DivisionPicker";
import { handleFailure, isObjectEmpty } from "../common";
import PositionBanner from "../components/PositionBanner/PositionBanner";
import emptyAnimation from "../../lotties/empty.json";

import sriLanka from "../assets/categories/srilanka.png";
import worldmasters from "../assets/categories/worldmasters.jpg";
import worldchampionship from "../assets/categories/worldchampionship.jpg";
import southasia from "../assets/categories/southasia.png";
import grandprix from "../assets/categories/granprix.png";
import commonwealth from "../assets/categories/commonwealth.png";
import asiaoceania from "../assets/categories/asiaocenia.png";
import asiangames from "../assets/categories/asiangames.png";
import asianchampionship from "../assets/categories/asianchampionship.png";
import judoFederation from "../assets/categories/judofederation.png";
import olympics from "../assets/categories/olympics.png";

const Tournament = () => {
  const dispatch = useDispatch();
  const [division, setDivision] = useState({
    division: "male",
    weightClass: 60,
  });

  const [view, setView] = useState("Standings");
  const [type, setType] = useState("Points");

  const loadingState = useSelector((state) => state.loadingState);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const tournamentId = queryParams.get("tournamentID");
  const [tournament, setTournament] = useState(null);
  const [positions, setPositions] = useState(null);

  const tierListToMap = (tierList) => {
    const properties = Object.getOwnPropertyNames(tierList);
    const tierMap = new Map();
    properties.forEach((key) => {
      console.log("key -> " + key);
      tierMap.set(key, tierList[key]);
    });
    return tierMap;
  };

  useEffect(() => {
    setDivision({
      division: "male",
      weightClass: 60,
    });
  }, [type]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${url}/participate/${tournamentId}/${division.division}/${division.weightClass}`
      );
  
      if (!isObjectEmpty(response.data)) {
        setPositions(tierListToMap(response.data));
      }
    })();
  }, [division, tournamentId]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(
          loadingStateActions.setLoadingState({
            loadingState: loadingStateConst.PENDING,
          })
        );

        const resp = await axios.get(`${url}/bracket/${tournamentId}`);
        console.log(resp.data);
        const tDetails = resp.data;

        const res = await axios.get(`${url}/tournament/${tournamentId}`);
        const tournamentDetails = res.data;

        let tournamentObj = {
          tournament: tournamentDetails,
          matches: [],
        };
        console.log(isObjectEmpty(resp.data));
        if (resp.data && res.data && !isObjectEmpty(resp.data)) {
          let matchObject = {
            male: {
              60: tDetails["male"]["60"]
                ? tierListToMap(tDetails["male"]["60"])
                : new Map(),
              66: tDetails["male"]["66"]
                ? tierListToMap(tDetails["male"]["66"])
                : new Map(),
              73: tDetails["male"]["73"]
                ? tierListToMap(tDetails["male"]["73"])
                : new Map(),
              81: tDetails["male"]["81"]
                ? tierListToMap(tDetails["male"]["81"])
                : new Map(),
              90: tDetails["male"]["90"]
                ? tierListToMap(tDetails["male"]["90"])
                : new Map(),
              100: tDetails["male"]["100"]
                ? tierListToMap(tDetails["male"]["100"])
                : new Map(),
              101: tDetails["male"]["101"]
                ? tierListToMap(tDetails["male"]["101"])
                : new Map(),
            },
            female: {
              48: tDetails["48"]
                ? tierListToMap(tDetails["female"]["48"])
                : new Map(),
              52: tDetails["52"]
                ? tierListToMap(tDetails["female"]["52"])
                : new Map(),
              57: tDetails["57"]
                ? tierListToMap(tDetails["female"]["57"])
                : new Map(),
              63: tDetails["63"]
                ? tierListToMap(tDetails["female"]["63"])
                : new Map(),
              70: tDetails["70"]
                ? tierListToMap(tDetails["female"]["70"])
                : new Map(),
              78: tDetails["78"]
                ? tierListToMap(tDetails["female"]["78"])
                : new Map(),
              79: tDetails["79"]
                ? tierListToMap(tDetails["female"]["79"])
                : new Map(),
            },
          };

          tournamentObj = {
            tournament: tournamentDetails,
            matches: matchObject,
          };
        }
        setTournament(tournamentObj);
        dispatch(
          loadingStateActions.setLoadingState({
            loadingState: loadingStateConst.FULLFILLED,
          })
        );
      } catch (e) {
        handleFailure(dispatch, e);
      } finally {
        dispatch(
          loadingStateActions.setLoadingState({
            loadingState: loadingStateConst.FULLFILLED,
          })
        );
      }
    })();
  }, [dispatch, tournamentId]);

  console.log(tournament);

  const onClickRadioHandler = (value) => {
    setType(value);
  };

  return (
    <>
      <Header />
      <section id="section-tournament">
        {loadingState.loadingState === loadingStateConst.PENDING ||
        tournament === null ? (
          <>
            <div className="heading-dark-7">
              Please wait while the data loads
            </div>
            <LottieAnimation width={"20rem"} />
          </>
        ) : (
          <div className="tournament">
            <div className="tournament__details">
              {tournament.tournament.points.id === 1 && (
                <img
                  src={sriLanka}
                  className="tournament__details__image"
                  alt="image"
                />
              )}
              {tournament.tournament.points.id === 2 && (
                <img
                  src={sriLanka}
                  className="tournament__details__image"
                  alt="image"
                />
              )}

              {tournament.tournament.points.id === 3 && (
                <img
                  src={southasia}
                  className="tournament__details__image"
                  alt="image"
                />
              )}

              {tournament.tournament.points.id === 4 && (
                <img
                  src={southasia}
                  className="tournament__details__image"
                  alt="image"
                />
              )}

              {tournament.tournament.points.id === 5 && (
                <img
                  src={asiaoceania}
                  className="tournament__details__image"
                  alt="image"
                />
              )}

              {tournament.tournament.points.id === 6 && (
                <img
                  src={commonwealth}
                  className="tournament__details__image"
                  alt="image"
                />
              )}
              {tournament.tournament.points.id === 7 && (
                <img
                  src={asianchampionship}
                  className="tournament__details__image"
                  alt="image"
                />
              )}
              {tournament.tournament.points.id === 8 && (
                <img
                  src={commonwealth}
                  className="tournament__details__image"
                  alt="image"
                />
              )}
              {tournament.tournament.points.id === 9 && (
                <img
                  src={asiangames}
                  className="tournament__details__image"
                  alt="image"
                />
              )}
              {tournament.tournament.points.id === 10 && (
                <img
                  src={judoFederation}
                  className="tournament__details__image"
                  alt="image"
                />
              )}

              {tournament.tournament.points.id === 11 && (
                <img
                  src={grandprix}
                  className="tournament__details__image"
                  alt="image"
                />
              )}
              {tournament.tournament.points.id === 12 && (
                <img
                  src={judoFederation}
                  className="tournament__details__image"
                  alt="image"
                />
              )}
              {tournament.tournament.points.id === 13 && (
                <img
                  src={worldmasters}
                  className="tournament__details__image"
                  alt="image"
                />
              )}
              {tournament.tournament.points.id === 14 && (
                <img
                  src={worldchampionship}
                  className="tournament__details__image"
                  alt="image"
                />
              )}
              {tournament.tournament.points.id === 15 && (
                <img
                  src={olympics}
                  className="tournament__details__image"
                  alt="image"
                />
              )}

              <div className="tournament__details__main">
                <div className="heading-light-3 mb-2">
                  {tournament.tournament.points.tournament}
                </div>
                <div className="heading-light-6 ml-1">
                  {tournament.tournament.date}
                </div>
              </div>
              <div className="tournament__details__stat"></div>
            </div>
            <TabBar
              valueList={["Points", "Matches"]}
              width={"57rem"}
              defaultVal={"Points"}
              onClickRadio={onClickRadioHandler}
            />
            {loadingState.loadingState === loadingStateConst.PENDING ? (
              <>
                <div className="heading-dark-7">
                  Please wait while the data loads
                </div>
                <LottieAnimation width={"20rem"} />
              </>
            ) : (
              <>
                {type === "Points" && (
                  <table className={"tournament__table"}>
                    <thead>
                      <tr>
                        <th>Position</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>First Place</td>
                        <td>{tournament.tournament.points.first} points</td>
                      </tr>
                      <tr>
                        <td>Second Place</td>
                        <td>{tournament.tournament.points.second} points</td>
                      </tr>
                      <tr>
                        <td>Third Place</td>
                        <td>{tournament.tournament.points.third} points</td>
                      </tr>
                      <tr>
                        <td>Fourth Place</td>
                        <td>{tournament.tournament.points.fourth} points</td>
                      </tr>
                      <tr>
                        <td>Fifth Place</td>
                        <td>{tournament.tournament.points.fifth} points</td>
                      </tr>
                      <tr>
                        <td>Sixth Place</td>
                        <td>{tournament.tournament.points.sixth} points</td>
                      </tr>
                      <tr>
                        <td>Seventh Place</td>
                        <td>{tournament.tournament.points.seventh} points</td>
                      </tr>
                      <tr>
                        <td>Eighth Place</td>
                        <td>{tournament.tournament.points.eighth} points</td>
                      </tr>
                      <tr>
                        <td>Ninth Place</td>
                        <td>{tournament.tournament.points.ninth} points</td>
                      </tr>
                      <tr>
                        <td>Tenth Place</td>
                        <td>{tournament.tournament.points.tenth} points</td>
                      </tr>
                      <tr>
                        <td>Participation</td>
                        <td>
                          {tournament.tournament.points.participation} points
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                {type === "Matches" && (
                  <div className="tournament-matches">
                    <div className="tournament-matches__picker">
                      <DivisionPicker
                        defaultValue={'{"division":"male","weightClass":60}'}
                        onClickRadio={(selectedDivision) =>
                          setDivision(selectedDivision)
                        }
                      />
                    </div>
                    <div className="tournament-matches__info">
                      <div className="tournament-matches__info__header">
                        <div className="heading-dark-3">Information</div>
                        <TabBar
                          valueList={["Standings", "MatchView"]}
                          width={"10rem"}
                          defaultVal={"Standings"}
                          onClickRadio={(value) => {
                            setView(value);
                          }}
                        />
                        {console.log(view)}
                      </div>
                      <div className="tournament-matches__list">
                        {tournament.matches.length === 0 ? (
                          <div className="empty">
                            <div className="heading-dark-3">
                              No matches found
                            </div>

                            <LottieAnimation
                              width={"40rem"}
                              animationData={emptyAnimation}
                            />
                          </div>
                        ) : (
                          <>
                            {tournament.matches[division.division][
                              division.weightClass
                            ].size === 0 ? (
                              <div className="empty">
                                <div className="heading-dark-3">
                                  No matches found
                                </div>

                                <LottieAnimation
                                  width={"40rem"}
                                  animationData={emptyAnimation}
                                />
                              </div>
                            ) : (
                              <>
                                {positions === null ? (
                                  <div className="heading-dark-5">
                                    Positions not yet calculated
                                  </div>
                                ) : (
                                  <>
                                    {view === "Standings" && (
                                      <>
                                        {Array.from(positions.keys()).map((k) =>
                                          positions
                                            .get(k)
                                            .map((participant) => (
                                              <PositionBanner
                                                position={k}
                                                key={participant.id}
                                                medal={1}
                                                participants={participant}
                                              />
                                            ))
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                                {view === "MatchView" && (
                                  <>
                                    {Array.from(
                                      tournament.matches[division.division][
                                        division.weightClass
                                      ].keys()
                                    ).map((k) => (
                                      <>
                                        <div
                                          key={k}
                                          className="tournament-matches__list__round"
                                        >
                                          Round {k}
                                          {tournament.matches[
                                            division.division
                                          ][division.weightClass]
                                            .get(k)
                                            .map((item, index) => (
                                              <MatchCard
                                                key={index}
                                                match={item}
                                              />
                                            ))}
                                        </div>
                                      </>
                                    ))}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Tournament;
