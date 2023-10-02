import Header from "../components/Header/Header";
import DivisionPicker from "../components/DivisionPicker/DivisionPicker";
import RankingBanner from "../components/RankingBanner/RankingBanner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingStateActions } from "../store/loading-state/loading-state";
import { loadingStateConst, url } from "../constants";
import axios from "axios";
import { handleFailure, isObjectEmpty } from "../common";
import LottieAnimation from "../components/Utility/LottieAnimation/LottieAnimation";
import emptyAnimation from "../../lotties/empty.json";

const Ranking = () => {
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.loadingState);
  const [ranking, setRanking] = useState(null);
  const [division, setDivision] = useState({
    division: "male",
    weightClass: 60,
  });
  useEffect(() => {
    (async () => {
      try {
        dispatch(
          loadingStateActions.setLoadingState({
            loadingState: loadingStateConst.PENDING,
          })
        );
        const resp = await axios.get(`${url}/rank`);
        console.log(resp.data);
        const tDetails = resp.data;
        const tierListToMap = (tierList) => {
          const properties = Object.getOwnPropertyNames(tierList);
          const tierMap = new Map();
          properties.forEach((key) => {
            console.log("key -> " + key);
            tierMap.set(key, tierList[key]);
          });
          return tierMap;
        };
        if (!isObjectEmpty(resp.data)) {
          let rankObject = {
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

          setRanking(rankObject);
        }
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
  }, [dispatch]);

  console.log(ranking);
  return (
    <>
      <Header />
      <section id="section-ranking">
        <div className="ranking">
          <div className="ranking__picker">
            <DivisionPicker
              defaultValue={'{"division":"male","weightClass":60}'}
              onClickRadio={(selectedDivision) => {
                setDivision(selectedDivision);
              }}
            />
          </div>
          {loadingState.loadingState === loadingStateConst.PENDING ||
          ranking === null ? (
            <>
              <div className="heading-dark-7">
                Please wait while the data loads
              </div>
              <LottieAnimation width={"20rem"} />
            </>
          ) : (
            <>
              {ranking[division.division][division.weightClass].size === 0 ? (
                <div className="empty">
                  <div className="heading-dark-3">No matches found</div>

                  <LottieAnimation
                    width={"40rem"}
                    animationData={emptyAnimation}
                  />
                </div>
              ) : (
                <div className="ranking__rank-list">
                  <div className="ranking__banner">
                    <div className="ranking__banner__place">
                      <div className="heading-light-5">Place</div>
                    </div>
                    <div className="ranking__banner__change">
                      <div className="heading-light-5">Ch</div>
                    </div>
                    <div className="ranking__banner__player">
                      <div className="heading-light-5">Player</div>
                    </div>
                    <div className="ranking__banner__club">
                      <div className="heading-light-5">Club</div>
                    </div>
                    <div className="ranking__banner__points">
                      <div className="heading-light-5">Points</div>
                    </div>
                    <div className="ranking__banner__wins">
                      <div className="heading-light-5">Wins</div>
                    </div>
                    <div className="ranking__banner__losses">
                      <div className="heading-light-5">Losses</div>
                    </div>
                  </div>
                  {Array.from(
                    ranking[division.division][division.weightClass].keys()
                  ).map((key) =>
                    ranking[division.division][division.weightClass]
                      .get(key)
                      .map((currentRanking) => (
                        <RankingBanner
                          key={currentRanking.id}
                          ranking={currentRanking}
                        />
                      ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Ranking;
