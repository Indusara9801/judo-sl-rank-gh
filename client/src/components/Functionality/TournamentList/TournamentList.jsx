import classes from "./TournamentList.module.scss";
import { useEffect, useState } from "react";
import { loadingStateConst } from "../../../constants";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import LottieAnimation from "../../Utility/LottieAnimation/LottieAnimation";
import TabBar from "../../TabBar/TabBar";
import axios from "axios";
const TournamentList = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [year, setYear] = useState(2021);
  const yearList = [2023, 2022, 2021, 2020];
  const [tournamentlist, setTournamentList] = useState([]);
  const [localState, setLocalState] = useState(loadingStateConst.IDLE);

  useEffect(() => {
    (async () => {
      setLocalState(loadingStateConst.PENDING);
      const res = await axios.get(
        `http://localhost:8080/playerTournament/${params.id}/${year}`
        // `/api/playerTournament/${params.id}/${year}`
      );
      setTournamentList(res.data);
      setLocalState(loadingStateConst.FULLFILLED);
    })();
  }, [year, params.id, dispatch]);

  const onClickRadioHandler = (value) => {
    setYear(value);
  };

  console.log(year);
  console.log(tournamentlist);

  return (
    <div className={classes.tournamentlist}>
      <TabBar
        valueList={yearList}
        onClickRadio={onClickRadioHandler}
        defaultVal={2023}
        width="25rem"
      />
      {localState === loadingStateConst.PENDING ? (
        <>
          <div className="heading-dark-7">Please wait while the data loads</div>
          <LottieAnimation height={20} width={400} />
        </>
      ) : (
        <>
          {tournamentlist.length === 0 ? (
            <div>No tournaments in this year</div>
          ) : (
            <table className={classes.tournamentlist__table}>
              <thead>
                <tr>
                  <th>Tournament</th>
                  <th>Date</th>
                  <th>Position</th>
                  <th>See more</th>
                </tr>
              </thead>
              <tbody>
                {tournamentlist.map((item) => {
                  console.log(item.position);
                  return (
                    <tr key={item.tournamentId}>
                      <td>{item.tournament}</td>
                      <td>{item.date}</td>
                      <td>{item.position}</td>
                      <td>
                        <Link
                          to={`/admin/tournament/points?tournamentID=${item.tournamentId}`}
                        >
                          More details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default TournamentList;