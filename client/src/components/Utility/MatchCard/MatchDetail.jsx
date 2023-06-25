import { useEffect, useState } from "react";
import classes from "./MatchDetail.module.scss";

import { loadingStateConst } from "../../../constants";
import { handleFailure } from "../../../common";
import { useDispatch } from "react-redux";
import LottieAnimation from "../LottieAnimation/LottieAnimation";
import image from "../../../assets/user.png";

const MatchDetail = ({ mid }) => {
  // const [localState, setLocalState] = useState(loadingStateConst.IDLE);
  // const [matchDetail, setMatchDetail] = useState({});
  // const dispatch = useDispatch();

  // const getMoreInfo = async (match) => {
  //   console.log(match.player);
  //   if (match.playerInDB) {
  //     let { data, error } = await supabase
  //       .from("player")
  //       .select("*")
  //       .eq("playerId", match.player);
  //     const player = data && data[0];

  //     if (player) {
  //       const { data } = supabase.storage
  //         .from("profile")
  //         .getPublicUrl(player.image);
  //       if (data) {
  //         return {
  //           ...match,
  //           player: player,
  //           image: data.publicUrl,
  //         };
  //       }
  //       if (error) {
  //         handleFailure(error, dispatch);
  //       }
  //     }
  //     if (error) {
  //       handleFailure(error, dispatch);
  //     }
  //   } else {
  //     return match;
  //   }
  // };

  // useEffect(() => {
  //   (async () => {
  //     setLocalState(loadingStateConst.PENDING);
  //     let { data, error } = await supabase
  //       .from("match_detail")
  //       .select("*")
  //       .eq("mid", mid);
  //     if (data) {
  //       const matchData = data;
  //       const player1 = await getMoreInfo(matchData[0]);
  //       const player2 = await getMoreInfo(matchData[1]);
  //       setMatchDetail({
  //         player1,
  //         player2,
  //       });
  //       setLocalState(loadingStateConst.FULLFILLED);
  //     }
  //     if (error) {
  //       handleFailure(error, dispatch);
  //     }
  //   })();
  // }, [dispatch]);

  // console.log(localState, matchDetail);
  // return (
  //   <div className={classes.matchdetail}>
  //     {localState === loadingStateConst.PENDING ||
  //     localState === loadingStateConst.IDLE ? (
  //       <>
  //         <div className="heading-dark-7">Please wait while the data loads</div>
  //         <LottieAnimation height={20} width={400} />
  //       </>
  //     ) : (
  //       <>
  //         <div className={classes.matchdetail__player}>
  //           <div className={classes.matchdetail__player__detail}>
  //             <h1 className="heading-dark-5">
  //               {matchDetail.player1.player.fullname}
  //             </h1>
  //             {matchDetail.player1.playerInDB ? (
  //               <img
  //                 className={classes.matchdetail__player__image}
  //                 src={matchDetail.player1.image}
  //                 alt="player1"
  //               />
  //             ) : (
  //               <img
  //                 className={classes.matchdetail__player__image}
  //                 src={image}
  //                 alt="player1"
  //               />
  //             )}

  //             <h1 className="heading-dark-5">
  //               {matchDetail.player1.won ? "win" : "loss"}
  //             </h1>
  //           </div>
  //         </div>
  //         <div className={classes.matchdetail__player__match}>
  //           <h1 className="heading-dark-6">
  //             Ippon - {matchDetail.player1.ippon}
  //           </h1>
  //           <h1 className="heading-dark-6">
  //             Wasa-Ari - {matchDetail.player1.wasaari}
  //           </h1>
  //           <h1 className="heading-dark-6">
  //             Penalty - {matchDetail.player1.penalty}
  //           </h1>
  //         </div>
  //         <div className={classes.matchdetail__player__match}>
  //           <h1 className="heading-dark-6">
  //             {matchDetail.player2.ippon} - Ippon
  //           </h1>
  //           <h1 className="heading-dark-6">
  //             {matchDetail.player2.wasaari} - Wasa-Ari
  //           </h1>
  //           <h1 className="heading-dark-6">
  //             {matchDetail.player2.penalty} - Penalty
  //           </h1>
  //         </div>
  //         <div className={classes.matchdetail__player}>
  //           <div className={classes.matchdetail__player__detail}>
  //             {matchDetail.player2.playerInDB ? (
  //               <>
  //                 <h1 className="heading-dark-5">
  //                   {matchDetail.player2.player.fullname}
  //                 </h1>
  //                 <img
  //                   className={classes.matchdetail__player__image}
  //                   src={matchDetail.player2.image}
  //                   alt="player2"
  //                 />
  //               </>
  //             ) : (
  //               <>
  //                 <img
  //                   className={classes.matchdetail__player__image}
  //                   src={image}
  //                   alt="player2"
  //                 />
  //               </>
  //             )}
  //             <h1 className="heading-dark-5">
  //               {matchDetail.player2.won ? "win" : "loss"}
  //             </h1>
  //           </div>
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
};

export default MatchDetail;
