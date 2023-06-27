import { useEffect, useState } from "react";
import classes from "./MatchDetail.module.scss";

import { loadingStateConst } from "../../../constants";
import { handleFailure } from "../../../common";
import { useDispatch } from "react-redux";
import LottieAnimation from "../LottieAnimation/LottieAnimation";
import image from "../../../assets/user.png";
import axios from "axios";

const MatchDetail = ({ match }) => {
  const [localState, setLocalState] = useState(loadingStateConst.IDLE);
  const [matchDetail, setMatchDetail] = useState({});
  const dispatch = useDispatch();

  console.log(match);
  const getMoreInfo = async (player) => {
    if (player.playerInDb) {
      const res = await axios.get(
        // `http://localhost:8080/player/${player.playerId}`
        `/api/player/${player.playerId}`
      );
      console.log(res.data);
      return {
        player,
        playerDetails: res.data,
      };
    } else {
      return player;
    }
  };

  useEffect(() => {
    (async () => {
      setLocalState(loadingStateConst.PENDING);
      const player1 = await getMoreInfo(match.player1);
      const player2 = await getMoreInfo(match.player2);

      setMatchDetail({
        player1: player1,
        player2: player2,
      });

      setLocalState(loadingStateConst.FULLFILLED);
    })();
  }, [match]);

  console.log(matchDetail);

  console.log(localState, matchDetail);
  return (
    <div className={classes.matchdetail}>
      {localState === loadingStateConst.PENDING ||
      localState === loadingStateConst.IDLE ? (
        <>
          <div className="heading-dark-7">Please wait while the data loads</div>
          <LottieAnimation height={20} width={400} />
        </>
      ) : (
        <>
          <div className={classes.matchdetail__player}>
            <div className={classes.matchdetail__player__detail}>
              <h1 className="heading-dark-5">
                {matchDetail.player1.player.playerInDb
                  ? matchDetail.player1.playerDetails.fullName
                  : matchDetail.player1.player.playerId}
              </h1>

              <img
                className={classes.matchdetail__player__image}
                src={image}
                alt="player1"
              />

              <h1 className="heading-dark-5">
                {matchDetail.player1.player.won ? "win" : "loss"}
              </h1>
            </div>
          </div>
          <div className={classes.matchdetail__player__match}>
            <h1 className="heading-dark-6">
              Ippon - {matchDetail.player1.player.ippon}
            </h1>
            <h1 className="heading-dark-6">
              Wasa-Ari - {matchDetail.player1.player.wasaAri}
            </h1>
            <h1 className="heading-dark-6">
              Penalty - {matchDetail.player1.player.penalty}
            </h1>
          </div>
          <div className={classes.matchdetail__player__match}>
            <h1 className="heading-dark-6">
              {matchDetail.player2.player.ippon} - Ippon
            </h1>
            <h1 className="heading-dark-6">
              {matchDetail.player2.player.wasaAri} - Wasa-Ari
            </h1>
            <h1 className="heading-dark-6">
              {matchDetail.player2.player.penalty} - Penalty
            </h1>
          </div>
          <div className={classes.matchdetail__player}>
            <div className={classes.matchdetail__player__detail}>
              {matchDetail.player2.player.playerInDb ? (
                <h1 className="heading-dark-5">
                  {matchDetail.player2.playerDetails.fullName}
                </h1>
              ) : (
                <h1 className="heading-dark-5">
                  {matchDetail.player2.player.playerId}
                </h1>
              )}
              <img
                className={classes.matchdetail__player__image}
                src={image}
                alt="player2"
              />

              <h1 className="heading-dark-5">
                {matchDetail.player2.player.won ? "win" : "loss"}
              </h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MatchDetail;
