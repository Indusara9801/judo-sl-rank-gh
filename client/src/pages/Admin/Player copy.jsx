import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadingStateConst } from "../../constants";
import LottieAnimation from "../../components/Utility/LottieAnimation/LottieAnimation";
import { loadingStateActions } from "../../store/loading-state/loading-state";
import supabase from "../../lib/supabaseClient";
import { handleFailure } from "../../common";
import TournamentList from "../../components/Functionality/TournamentList/TournamentList";

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
      const { data, error } = await supabase
        .rpc("get_player_stats", {pid: params.id});
      const userData = data && data[0];

      if (userData) {
        const { data } = supabase.storage
          .from("profile")
          .getPublicUrl(userData.image);

        const completeUser = {
          ...userData,
          imageUrl: data.publicUrl,
        };
        console.log(completeUser);
        setPlayer(completeUser);

        dispatch(
          loadingStateActions.setLoadingState({
            loadingState: loadingStateConst.FULLFILLED,
          })
        );
      }
      if (error) {
        handleFailure(dispatch, error);
      }
    })();
  }, [dispatch, params.id]);

  console.log(player);

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
                    <img
                      src={player.imageUrl}
                      alt="player"
                      className="player__image"
                    />
                  )}
                </div>
              </div>

              <div className="player__details__main">
                <div className="heading-light-3 mb-2">
                  {player.fullname}
                </div>
                <div className="heading-light-6 ml-1">{player.id}</div>
                <div className="heading-light-6 ml-1">
                  Club - {player.clubname}
                </div>
                <div className="heading-light-6 ml-1">
                  Weight - {player.weightclass}
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
                <div className="heading-light-6 ml-1">Wins - {player.wins}</div>
                <div className="heading-light-6 ml-1">
                  Losses - {player.losses}
                </div>
                <div className="heading-light-6 ml-1">
                  Points - {player.points}
                </div>
              </div>
              <div className={"player__details__stripe--" + player.judograde.toLowerCase()}>
                    ab
              </div>
            </div>
            <TournamentList pid={params.id}/>
          </div>
        )}
      </section>
    </>
  );
};

export default Player;
