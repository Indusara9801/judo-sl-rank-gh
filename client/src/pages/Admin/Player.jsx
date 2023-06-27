import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadingStateConst } from "../../constants";
import LottieAnimation from "../../components/Utility/LottieAnimation/LottieAnimation";
import { loadingStateActions } from "../../store/loading-state/loading-state";
import TournamentList from "../../components/Functionality/TournamentList/TournamentList";
import axios from "axios";
import profile from "../../assets/user.png";

const Player = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.loadingState);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    (async () => {
      dispatch(
        loadingStateActions.setLoadingState({
          loadingState: loadingStateConst.PENDING,
        })
      );
      const res = await axios.get(
        `http://localhost:8080/player/${params.id}`
        // `/api/player/${params.id}`
      );
      setPlayer(res.data);
      dispatch(
        loadingStateActions.setLoadingState({
          loadingState: loadingStateConst.FULLFILLED,
        })
      );
    })();
  }, [dispatch, params.id]);

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
            <LottieAnimation height={20} width={400} />
          </>
        ) : (
          <div className="player">
            <div className="player__details">
              <div className="player__details__image">
                <div className="player__image-container">
                  {loadingState.loadingState === loadingStateConst.PENDING ? (
                    <div className="player__image-loading">assdd</div>
                  ) : (
                    <img src={profile} alt="player" className="player__image" />
                  )}
                </div>
              </div>

              <div className="player__details__main">
                <div className="heading-light-3 mb-2">{player.fullName}</div>
                {/* <div className="heading-light-6 ml-1">{player.id}</div> */}
                <div className="heading-light-6 ml-1">
                  Club - {player.clubName}
                </div>
                <div className="heading-light-6 ml-1">
                  Weight - {player.weightClass}
                </div>
                <div className="heading-light-6 ml-1">
                  Province - {player.province}
                </div>
                <div className="heading-light-6 ml-1">
                  Division - {player.gender}
                </div>
              </div>
              <div className="player__details__stat">
                <div className="heading-light-3 mb-2">Stats</div>
                <div className="heading-light-6 ml-1">
                  Wins - {player.playerStat.wins}
                </div>
                <div className="heading-light-6 ml-1">
                  Losses - {player.playerStat.losses}
                </div>
                <div className="heading-light-6 ml-1">
                  Points - {player.playerStat.points}
                </div>
              </div>
              <div
                className={
                  "player__details__stripe--" + player.judoGrade.toLowerCase()
                }
              ></div>
            </div>
            <TournamentList pid={params.id} />
          </div>
        )}
      </section>
    </>
  );
};

export default Player;
