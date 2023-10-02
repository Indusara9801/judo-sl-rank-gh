import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingStateConst,
  maleWeightMap,
  femaleWeightMap,
  tournamentListTypes,
  url,
} from "../../constants";
import LottieAnimation from "../../components/Utility/LottieAnimation/LottieAnimation";
import { loadingStateActions } from "../../store/loading-state/loading-state";
import TournamentList from "../../components/Functionality/TournamentList/TournamentList";
import axios from "axios";
import profile from "../../assets/user.png";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

const Player = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.loadingState);
  const [player, setPlayer] = useState(null);
  const [statNumber, setStatNumber] = useState(0);

  useEffect(() => {
    (async () => {
      dispatch(
        loadingStateActions.setLoadingState({
          loadingState: loadingStateConst.PENDING,
        })
      );
      const res = await axios.get(`${url}/player/${params.id}`);
      setPlayer(res.data);
      dispatch(
        loadingStateActions.setLoadingState({
          loadingState: loadingStateConst.FULLFILLED,
        })
      );
    })();
  }, [dispatch, params.id]);

  console.log(player);
  console.log(statNumber);

  return (
    <>
      <Header />
      <section id="section-player">
        {loadingState.loadingState === loadingStateConst.PENDING ||
        player === null ? (
          <>
            <div className="heading-dark-7">
              Please wait while the data loads
            </div>
            <LottieAnimation width={"20rem"} />
          </>
        ) : (
          <div className="player">
            <div className="player__details">
              <div className="player__details__info">
                <div className="player__details__image">
                  <div className="player__image-container">
                    {loadingState.loadingState === loadingStateConst.PENDING ? (
                      <div className="player__image-loading">assdd</div>
                    ) : (
                      <img
                        src={profile}
                        alt="player"
                        className="player__image"
                      />
                    )}
                  </div>
                </div>
                <div className="player__details__main">
                  <div className="heading-light-3 mb-2">{player.fullName}</div>

                  <div className="heading-light-6 ml-1">
                    Club - {player.clubName}
                  </div>
                  <div className="heading-light-6 ml-1">
                    Province - {player.province}
                  </div>
                  <div className="heading-light-6 ml-1">
                    Division - {player.playerStat[0].division.gender}
                  </div>
                </div>
              </div>

              <div className="player__details__info">
                <FiArrowLeftCircle
                  className={`${
                    statNumber === 0 ? "stat-icon--disabled" : "stat-icon"
                  }`}
                  onClick={() => {
                    setStatNumber((prevState) => prevState - 1);
                  }}
                />
                <div className="player__details__stat">
                  <div className="heading-dark-5 ml-1 mb-1">
                    {player.playerStat[0].division.gender === "male"
                      ? maleWeightMap.get(
                          player.playerStat[statNumber].division.weightClass
                        )
                      : femaleWeightMap.get(
                          player.playerStat[statNumber].division.weightClass
                        )}
                  </div>

                  <div className="heading-dark-6 ml-1">
                    Wins - {player.playerStat[statNumber].wins}
                  </div>
                  <div className="heading-dark-6 ml-1">
                    Losses - {player.playerStat[statNumber].losses}
                  </div>
                  <div className="heading-dark-6 ml-1">
                    Points - {player.playerStat[statNumber].points}
                  </div>
                </div>
                <FiArrowRightCircle
                  className={`${
                    statNumber === player.playerStat.length - 1
                      ? "stat-icon--disabled"
                      : "stat-icon"
                  }`}
                  onClick={() => {
                    setStatNumber((prevState) => prevState + 1);
                  }}
                />
                <div
                  className={
                    "player__details__stripe--" + player.judoGrade.toLowerCase()
                  }
                ></div>
              </div>
            </div>
            <TournamentList pid={params.id} type={tournamentListTypes.PLAYER} />
          </div>
        )}
      </section>
    </>
  );
};

export default Player;
