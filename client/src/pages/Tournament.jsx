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

  // useEffect(() => {
  //   (async () => {
  //     dispatch(
  //       loadingStateActions.setLoadingState({
  //         loadingState: loadingStateConst.PENDING,
  //       })
  //     );
  //     let { data, error } = await supabase.rpc("get_tournament_details", {
  //       tournamentid: tournamentId,
  //     });
  //     const tournamentDetails = data;

  //     console.log(data);

  //     if (tournamentDetails) {
  //       let tournamentObject = {
  //         tournamentDetails,
  //         matches: {
  //           male: {
  //             60: [],
  //             66: [],
  //             73: [],
  //             81: [],
  //             90: [],
  //             100: [],
  //             "100Plus": [],
  //           },
  //           female: {
  //             48: [],
  //             52: [],
  //             57: [],
  //             63: [],
  //             70: [],
  //             78: [],
  //             "78Plus": [],
  //           },
  //         },
  //       };

  //       let { data, error } = await supabase
  //         .from("matches")
  //         .select("mid, name, weightClass, division, time, order")
  //         .eq("tournamentID", tournamentId)
  //         .order("order");
  //       if (data) {
  //         data.forEach((match) => {
  //           if (match.division === "male") {
  //             switch (match.weightClass) {
  //               case 60:
  //                 tournamentObject.matches.male[60].push(match);
  //                 break;
  //               case 66:
  //                 tournamentObject.matches.male[66].push(match);
  //                 break;
  //               case 73:
  //                 tournamentObject.matches.male[73].push(match);
  //                 break;
  //               case 81:
  //                 tournamentObject.matches.male[81].push(match);
  //                 break;
  //               case 90:
  //                 tournamentObject.matches.male[90].push(match);
  //                 break;
  //               case 100:
  //                 tournamentObject.matches.male[100].push(match);
  //                 break;
  //               case 101:
  //                 tournamentObject.matches.male["100Plus"].push(match);
  //                 break;
  //               default:
  //                 console.error("NOT VALID");
  //             }
  //           } else {
  //             switch (match.weightClass) {
  //               case 48:
  //                 tournamentObject.matches.male[48].push(match);
  //                 break;
  //               case 52:
  //                 tournamentObject.matches.male[52].push(match);
  //                 break;
  //               case 57:
  //                 tournamentObject.matches.male[57].push(match);
  //                 break;
  //               case 63:
  //                 tournamentObject.matches.male[63].push(match);
  //                 break;
  //               case 70:
  //                 tournamentObject.matches.male[70].push(match);
  //                 break;
  //               case 78:
  //                 tournamentObject.matches.male[78].push(match);
  //                 break;
  //               case 79:
  //                 tournamentObject.matches.male["78Plus"].push(match);
  //                 break;
  //               default:
  //                 console.error("NOT VALID");
  //             }
  //           }
  //         });
  //         console.log("tournamentOBJ -----> ", tournamentObject);
  //         console.log(
  //           "tournamentOBJKeys -----> ",
  //           Object.keys(tournamentObject.matches.male)
  //         );
  //         setTournament(tournamentObject);
  //       }
  //       if (error) {
  //       }

  //       dispatch(
  //         loadingStateActions.setLoadingState({
  //           loadingState: loadingStateConst.FULLFILLED,
  //         })
  //       );
  //     }
  //     if (error) {
  //       handleFailure(dispatch, error);
  //     }
  //   })();
  // }, [dispatch, tournamentId]);

  // const onClickRadioHandler = (value) => {
  //   history.replace(
  //     `/admin/tournament/${value.toLowerCase()}/?tournamentID=${tournamentId}`
  //   );
  // };

  // const onMaleDivisionClick = (value) => {
  //   setSelectedMaleWeightClass(value);
  // };

  // const onFemaleDivisionClick = (value) => {
  //   setSelectedFemaleWeightClass(value);
  // };

  // console.log(selectedMaleWeightClass);
  // console.log(selectedFemaleWeightClass);
  // return (
  //   <>
  //     <Header />
  //     <section id="section-tournament">
  //       {loadingState.loadingState === loadingStateConst.PENDING ||
  //       tournament === null ? (
  //         <>
  //           <div className="heading-dark-7">
  //             Please wait while the data loads
  //           </div>
  //           <LottieAnimation height={20} width={400} />
  //         </>
  //       ) : (
  //         <div className="tournament">
  //           <div className="tournament__details">
  //             <div className="tournament__details__main">
  //               <div className="heading-light-3 mb-2">
  //                 {tournament.tournamentDetails.tournamentname}
  //               </div>
  //               <div className="heading-light-6 ml-1">
  //                 {tournament.tournamentDetails.date}
  //               </div>
  //             </div>
  //             <div className="tournament__details__stat"></div>
  //           </div>
  //           <TabBar
  //             valueList={["Points", "Matches"]}
  //             width={"50rem"}
  //             defaultVal={"Points"}
  //             onClickRadio={onClickRadioHandler}
  //           />
  //           {loadingState.loadingState === loadingStateConst.PENDING ? (
  //             <>
  //               <div className="heading-dark-7">
  //                 Please wait while the data loads
  //               </div>
  //               <LottieAnimation height={20} width={400} />
  //             </>
  //           ) : (
  //             <>
  //               <Route path="/admin/tournament/points">
  //                 <table className={"tournament__table"}>
  //                   <thead>
  //                     <tr>
  //                       <th>Position</th>
  //                       <th>Points</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     <tr>
  //                       <td>First</td>
  //                       <td>{tournament.tournamentDetails.first}</td>
  //                     </tr>
  //                     <tr>
  //                       <td>Second</td>
  //                       <td>{tournament.tournamentDetails.second}</td>
  //                     </tr>
  //                     <tr>
  //                       <td>Third</td>
  //                       <td>{tournament.tournamentDetails.third}</td>
  //                     </tr>
  //                     <tr>
  //                       <td>Fourtd</td>
  //                       <td>{tournament.tournamentDetails.fourth}</td>
  //                     </tr>
  //                     <tr>
  //                       <td>Fiftd</td>
  //                       <td>{tournament.tournamentDetails.fifth}</td>
  //                     </tr>
  //                     <tr>
  //                       <td>Sixtd</td>
  //                       <td>{tournament.tournamentDetails.sixth}</td>
  //                     </tr>
  //                     <tr>
  //                       <td>Seventd</td>
  //                       <td>{tournament.tournamentDetails.seventh}</td>
  //                     </tr>
  //                     <tr>
  //                       <td>Eightd</td>
  //                       <td>{tournament.tournamentDetails.eigth}</td>
  //                     </tr>
  //                     <tr>
  //                       <td>Nintd</td>
  //                       <td>{tournament.tournamentDetails.ninth}</td>
  //                     </tr>
  //                     <tr>
  //                       <td>Tentd</td>
  //                       <td>{tournament.tournamentDetails.tenth}</td>
  //                     </tr>
  //                     <tr>
  //                       <td>Participation</td>
  //                       <td>{tournament.tournamentDetails.participation}</td>
  //                     </tr>
  //                   </tbody>
  //                 </table>
  //               </Route>
  //               <Route path="/admin/tournament/matches">
  //                 <h1 className="heading-dark-3">Male</h1>
  //                 <TabBar
  //                   valueList={Object.keys(tournament.matches.male)}
  //                   width={"15rem"}
  //                   defaultVal={"60"}
  //                   onClickRadio={onMaleDivisionClick}
  //                 />
  //                 {tournament.matches.male[selectedMaleWeightClass].length ===
  //                 0 ? (
  //                   "No matches in this weight class"
  //                 ) : (
  //                   <>
  //                     {tournament.matches.male[selectedMaleWeightClass].map(
  //                       (match) => {
  //                         console.log(match);
  //                         return <MatchCard match={match} />;
  //                       }
  //                     )}
  //                   </>
  //                 )}
  //                 <h1 className="heading-dark-3">Female</h1>
  //                 <TabBar
  //                   valueList={Object.keys(tournament.matches.female)}
  //                   width={"15rem"}
  //                   defaultVal={"48"}
  //                   onClickRadio={onFemaleDivisionClick}
  //                 />
  //                 {tournament.matches.female[selectedFemaleWeightClass]
  //                   .length === 0
  //                   ? "No matches in this weight class"
  //                   : "we have matches"}
  //               </Route>
  //             </>
  //           )}
  //         </div>
  //       )}
  //     </section>
  //   </>
  // );
};

export default Tournament;
