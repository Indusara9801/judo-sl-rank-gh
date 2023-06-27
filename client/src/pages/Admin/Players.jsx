import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/Utility/SearchBar/Search";
import { loadingStateActions } from "../../store/loading-state/loading-state";
import { loadingStateConst, searchItems } from "../../constants";
import LottieAnimation from "../../components/Utility/LottieAnimation/LottieAnimation";
import Header from "../../components/Header/Header";
import axios from "axios";
const Players = () => {
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.loadingState);

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    (async () => {
      dispatch(
        loadingStateActions.setLoadingState({
          loadingState: loadingStateConst.PENDING,
        })
      );
      const res = await axios.get(
        // "http://localhost:8080/admin/users"
        "/api/admin/users"
      );
      setPlayers(res.data);
      dispatch(
        loadingStateActions.setLoadingState({
          loadingState: loadingStateConst.FULLFILLED,
        })
      );
    })();
  }, [dispatch]);

  return (
    <>
      <Header />
      <section id="section-players">
        {loadingState.loadingState === loadingStateConst.PENDING ||
        loadingState.loadingState === loadingStateConst.IDLE ? (
          <>
            <div className="heading-dark-7">
              Please wait while the data loads
            </div>
            <LottieAnimation height={20} width={400} />
          </>
        ) : (
          <Search
            list={players}
            item={searchItems.PLAYER}
            placeholder="Search for players"
          />
        )}
      </section>
    </>
  );
};

export default Players;
