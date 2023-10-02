import { useEffect, useState } from "react";
import classes from "./MatchDetail.module.scss";

import { loadingStateConst, url } from "../../../constants";
import LottieAnimation from "../LottieAnimation/LottieAnimation";
import image from "../../../assets/user.png";
import axios from "axios";
import { TbCardsFilled } from "react-icons/tb";
import { RiVipCrownFill } from "react-icons/ri";

const MatchDetail = ({ match }) => {
  const [localState, setLocalState] = useState(loadingStateConst.IDLE);
  const [matchDetail, setMatchDetail] = useState({});

  console.log(match);
  const getMoreInfo = async (player) => {
    if (player.playerInDb) {
      const res = await axios.get(`${url}/playerByEmail/${player.playerId}`);
      console.log(res.data);
      return {
        ...player,
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
        white: player1.color === "WHITE" ? player1 : player2,
        blue: player2.color === "BLUE" ? player2 : player1,
      });

      setLocalState(loadingStateConst.FULLFILLED);
    })();
  }, [match]);

  console.log(matchDetail);

  console.log(localState, matchDetail);
  return (
    <>
      {localState === loadingStateConst.PENDING ||
      localState === loadingStateConst.IDLE ? (
        <>
          <div className="heading-dark-7">Please wait while the data loads</div>
          <LottieAnimation width={"20rem"} />
        </>
      ) : (
        <div className={classes.matchdetail}>
          <div className={classes["matchdetail--white"]}>
            <div
              className={`${classes.matchdetail__player} ${classes["matchdetail__player--white"]}`}
            >
              <div className={classes.matchdetail__player__detail}>
                <h1 className="heading-dark-6">
                  {matchDetail.white.playerInDb
                    ? matchDetail.white.playerDetails.fullName
                    : matchDetail.white.playerId}
                </h1>

                <img
                  className={classes.matchdetail__player__image}
                  src={image}
                  alt="player1"
                />

                <h1 className="heading-dark-5">
                  {matchDetail.white.won ? (
                    <div className="row">
                      <div className="col-2">
                        <RiVipCrownFill className={classes.winner} />
                      </div>
                      <div className="col-2">Win</div>
                    </div>
                  ) : (
                    "Loss"
                  )}
                </h1>
              </div>
            </div>

            <div
              className={`${classes.matchdetail__player__match} ${classes["matchdetail__player__match--white"]}`}
            >
              <h1 className="heading-dark-6">
                Ippon - {matchDetail.white.ippon}
              </h1>
              <h1 className="heading-dark-6">
                Wasa-Ari - {matchDetail.white.wasaAri}
              </h1>
              <h1 className="heading-dark-6">
                <div className={classes["penalty-list"]}>
                  Penalty -{" "}
                  {matchDetail.white.penalty === 0 && matchDetail.white.penalty}
                  {matchDetail.white.penalty < 3 ? (
                    <>
                      {Array.from(
                        { length: matchDetail.white.penalty },
                        (_, index) => (
                          <TbCardsFilled
                            key={index}
                            className={classes.penalty}
                          />
                        )
                      )}
                    </>
                  ) : (
                    <TbCardsFilled className={classes["red-card"]} />
                  )}{" "}
                </div>
              </h1>
            </div>
          </div>
          <div className={classes["matchdetail--blue"]}>
            <div
              className={`${classes.matchdetail__player__match} ${classes["matchdetail__player__match--blue"]}`}
            >
              <h1 className="heading-dark-6">
                {matchDetail.blue.ippon} - Ippon
              </h1>
              <h1 className="heading-dark-6">
                {matchDetail.blue.wasaAri} - Wasa-Ari
              </h1>
              <h1 className="heading-dark-6">
                <div className={classes["penalty-list"]}>
                  {matchDetail.blue.penalty < 3 ? (
                    <>
                      {Array.from(
                        { length: matchDetail.blue.penalty },
                        (_, index) => (
                          <TbCardsFilled
                            key={index}
                            className={classes.penalty}
                          />
                        )
                      )}
                    </>
                  ) : (
                    <TbCardsFilled className={classes["red-card"]} />
                  )}
                  {matchDetail.blue.penalty === 0 && matchDetail.blue.penalty} -
                  Penalty
                </div>
              </h1>
            </div>
            <div
              className={`${classes.matchdetail__player} ${classes["matchdetail__player--blue"]}`}
            >
              <div className={classes.matchdetail__player__detail}>
                {matchDetail.blue.playerInDb ? (
                  <h1 className="heading-dark-6">
                    {matchDetail.blue.playerDetails.displayName}
                  </h1>
                ) : (
                  <h1 className="heading-dark-6">
                    {matchDetail.blue.playerId}
                  </h1>
                )}

                <img
                  className={classes.matchdetail__player__image}
                  src={image}
                  alt="player2"
                />

                <h1 className="heading-dark-5">
                  {matchDetail.blue.won ? (
                    <div className="row">
                      <div className="col-2">
                        <RiVipCrownFill className={classes.winner} />
                      </div>
                      <div className="col-2">Win</div>
                    </div>
                  ) : (
                    "Loss"
                  )}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MatchDetail;
