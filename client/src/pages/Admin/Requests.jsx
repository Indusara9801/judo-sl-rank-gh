import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/Utility/SearchBar/Search";
import { loadingStateActions } from "../../store/loading-state/loading-state";
import { loadingStateConst, searchItems } from "../../constants";
import LottieAnimation from "../../components/Utility/LottieAnimation/LottieAnimation";
import Header from "../../components/Header/Header";
import axios from "axios";

const Requests = () => {
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.loadingState);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    (async () => {
      dispatch(
        loadingStateActions.setLoadingState({
          loadingState: loadingStateConst.PENDING,
        })
      );
      const res = await axios.get(
        "http://localhost:8080/admin/requests"
        // "/api/admin/requests"
      );
      setRequests(res.data);
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
      <section id="section-requests">
        {loadingState.loadingState === loadingStateConst.PENDING ? (
          <>
            <div className="heading-dark-7">
              Please wait while the data loads
            </div>
            <LottieAnimation height={20} width={400} />
          </>
        ) : (
          <Search
            list={requests}
            item={searchItems.REQUEST}
            placeholder="Search for requests"
          />
        )}
      </section>
    </>
  );
};

export default Requests;
