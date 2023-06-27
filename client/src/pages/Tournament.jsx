import LottieAnimation from "../components/Utility/LottieAnimation/LottieAnimation";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadingStateActions } from "../store/loading-state/loading-state";
import { loadingStateConst } from "../constants";

import { handleFailure } from "../common";
import Header from "../components/Header/Header";
import TabBar from "../components/TabBar/TabBar";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MatchCard from "../components/Utility/MatchCard/MatchCard";
import axios from "axios";

const Tournament = () => {
  const dispatch = useDispatch();

  const loadingState = useSelector((state) => state.loadingState);

  const location = useLocation();
  const history = useHistory();

  const queryParams = new URLSearchParams(location.search);
  const tournamentId = queryParams.get("tournamentID");
  const [tournament, setTournament] = useState(null);
  const [selectedMaleWeightClass, setSelectedMaleWeightClass] = useState("60");
  const [selectedFemaleWeightClass, setSelectedFemaleWeightClass] =
    useState("48");
  console.log(tournamentId);

  useEffect(() => {
    (async () => {
      dispatch(
        loadingStateActions.setLoadingState({
          loadingState: loadingStateConst.PENDING,
        })
      );

      const res = await axios.get(
        `http://localhost:8080/tournament/${tournamentId}`
      );
      const tournamentDetails = res.data;

      if (tournamentDetails) {
        let matchObject = {
          male: {
            60: [],
            66: [],
            73: [],
            81: [],
            90: [],
            100: [],
            "100Plus": [],
          },
          female: {
            48: [],
            52: [],
            57: [],
            63: [],
            70: [],
            78: [],
            "78Plus": [],
          },
        };

        let matches = tournamentDetails.matches;
        matches.forEach((match) => {
          if (match.division === "male") {
            console.log(match);
            switch (match.weightClass) {
              case 60:
                matchObject.male[60].push(match);
                break;
              case 66:
                matchObject.male[66].push(match);
                break;
              case 73:
                matchObject.male[73].push(match);
                break;
              case 81:
                matchObject.male[81].push(match);
                break;
              case 90:
                matchObject.male[90].push(match);
                break;
              case 100:
                matchObject.male[100].push(match);
                break;
              case 101:
                matchObject.male["100Plus"].push(match);
                break;
              default:
                console.error("NOT VALID");
            }
          } else {
            switch (match.weightClass) {
              case 48:
                matchObject.male[48].push(match);
                break;
              case 52:
                matchObject.male[52].push(match);
                break;
              case 57:
                matchObject.male[57].push(match);
                break;
              case 63:
                matchObject.male[63].push(match);
                break;
              case 70:
                matchObject.male[70].push(match);
                break;
              case 78:
                matchObject.male[78].push(match);
                break;
              case 79:
                matchObject.male["78Plus"].push(match);
                break;
              default:
                console.error("NOT VALID");
            }
          }
        });
        const tournamentObj = {
          ...tournamentDetails,
          matches: matchObject,
        };
        console.log(tournamentObj);
        setTournament(tournamentObj);
        
      }

      dispatch(
        loadingStateActions.setLoadingState({
          loadingState: loadingStateConst.FULLFILLED,
        })
      );
    })();
  }, [dispatch, tournamentId]);

  const onClickRadioHandler = (value) => {
    history.replace(
      `/admin/tournament/${value.toLowerCase()}/?tournamentID=${tournamentId}`
    );
  };

  const onMaleDivisionClick = (value) => {
    setSelectedMaleWeightClass(value);
  };

  const onFemaleDivisionClick = (value) => {
    setSelectedFemaleWeightClass(value);
  };

  console.log(selectedMaleWeightClass);
  console.log(selectedFemaleWeightClass);
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
            <LottieAnimation height={20} width={400} />
          </>
        ) : (
          <div className="tournament">
            <div className="tournament__details">
              <div className="tournament__details__main">
                <div className="heading-light-3 mb-2">
                  
                  {tournament.points.tournament}
                </div>
                <div className="heading-light-6 ml-1">
                  {tournament.date}
                </div>
              </div>
              <div className="tournament__details__stat"></div>
            </div>
            <TabBar
              valueList={["Points", "Matches"]}
              width={"50rem"}
              defaultVal={"Points"}
              onClickRadio={onClickRadioHandler}
            />
            {loadingState.loadingState === loadingStateConst.PENDING ? (
              <>
                <div className="heading-dark-7">
                  Please wait while the data loads
                </div>
                <LottieAnimation height={20} width={400} />
              </>
            ) : (
              <>
                <Route path="/admin/tournament/points">
                  <table className={"tournament__table"}>
                    <thead>
                      <tr>
                        <th>Position</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>First</td>
                        <td>{tournament.points.first}</td>
                      </tr>
                      <tr>
                        <td>Second</td>
                        <td>{tournament.points.second}</td>
                      </tr>
                      <tr>
                        <td>Third</td>
                        <td>{tournament.points.third}</td>
                      </tr>
                      <tr>
                        <td>Fourtd</td>
                        <td>{tournament.points.fourth}</td>
                      </tr>
                      <tr>
                        <td>Fiftd</td>
                        <td>{tournament.points.fifth}</td>
                      </tr>
                      <tr>
                        <td>Sixtd</td>
                        <td>{tournament.points.sixth}</td>
                      </tr>
                      <tr>
                        <td>Seventd</td>
                        <td>{tournament.points.seventh}</td>
                      </tr>
                      <tr>
                        <td>Eightd</td>
                        <td>{tournament.points.eigth}</td>
                      </tr>
                      <tr>
                        <td>Nintd</td>
                        <td>{tournament.points.ninth}</td>
                      </tr>
                      <tr>
                        <td>Tentd</td>
                        <td>{tournament.points.tenth}</td>
                      </tr>
                      <tr>
                        <td>Participation</td>
                        <td>{tournament.points.participation}</td>
                      </tr>
                    </tbody>
                  </table>
                </Route>
                <Route path="/admin/tournament/matches">
                  <h1 className="heading-dark-3">Male</h1>
                  <TabBar
                    valueList={Object.keys(tournament.matches.male)}
                    width={"15rem"}
                    defaultVal={"60"}
                    onClickRadio={onMaleDivisionClick}
                  />
                  {tournament.matches.male[selectedMaleWeightClass].length ===
                  0 ? (
                    "No matches in this weight class"
                  ) : (
                    <>
                      {tournament.matches.male[selectedMaleWeightClass].map(
                        (match, index) => {
                          console.log(match);
                          return <MatchCard key={index} match={match} />;
                        }
                      )}
                    </>
                  )}
                  <h1 className="heading-dark-3">Female</h1>
                  <TabBar
                    valueList={Object.keys(tournament.matches.female)}
                    width={"15rem"}
                    defaultVal={"48"}
                    onClickRadio={onFemaleDivisionClick}
                  />
                  {tournament.matches.female[selectedFemaleWeightClass]
                    .length === 0
                    ? "No matches in this weight class"
                    : "we have matches"}
                </Route>
              </>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Tournament;
