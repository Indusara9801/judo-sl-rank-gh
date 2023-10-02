import classes from "./TournamentList.module.scss";
import { useEffect, useState } from "react";
import {
  loadingStateConst,
  tournamentListTypes,
  url,
} from "../../../constants";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import LottieAnimation from "../../Utility/LottieAnimation/LottieAnimation";
import TabBar from "../../TabBar/TabBar";
import axios from "axios";
import Header from "../../Header/Header";
import emptyAnimation from "../../../../lotties/empty.json";
const TournamentList = ({ type }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const [year, setYear] = useState(new Date().getFullYear());
  const yearList = [2023, 2022, 2021, 2020];
  const [tournamentlist, setTournamentList] = useState([]);
  const [localState, setLocalState] = useState(loadingStateConst.IDLE);

  useEffect(() => {
    (async () => {
      setLocalState(loadingStateConst.PENDING);
      const res = await axios.get(
        type === tournamentListTypes.PLAYER
          ? `${url}/playerTournament/${params.id}/${year}`
          : `${url}/tournaments/${year}`
      );
      setTournamentList(res.data);
      setLocalState(loadingStateConst.FULLFILLED);
    })();
  }, [year, params.id, dispatch, type]);

  const onClickRadioHandler = (value) => {
    setYear(value);
  };

  console.log(year);
  console.log(tournamentlist);

  return (
    <>
      {/* {type === tournamentListTypes.PLAYER ? (
        <> </>
      ) : (
        <Header
          body={
            <TabBar
              valueList={yearList}
              onClickRadio={onClickRadioHandler}
              defaultVal={2023}
              width="27rem"
            />
          }
        />
      )} */}
      <Header
        body={
          <TabBar
            valueList={yearList}
            onClickRadio={onClickRadioHandler}
            defaultVal={2023}
            width="27rem"
          />
        }
      />

      {/* <TabBar
        valueList={yearList}
        onClickRadio={onClickRadioHandler}
        defaultVal={2023}
        width="27rem"
      /> */}

      <div className={classes.tournamentlist}>
        {localState === loadingStateConst.PENDING ? (
          <>
            <div className="heading-dark-7">
              Please wait while the data loads
            </div>
            <LottieAnimation width={"20rem"} />
          </>
        ) : (
          <>
            {tournamentlist.length === 0 ? (
              <div className="empty">
                <div className="heading-dark-3">No tournaments found</div>

                <LottieAnimation
                  width={"40rem"}
                  animationData={emptyAnimation}
                />
              </div>
            ) : type === tournamentListTypes.PLAYER ? (
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
                            to={`/admin/tournament?tournamentID=${item.tournamentId}`}
                          >
                            More details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <table className={classes.tournamentlist__table}>
                <thead>
                  <tr>
                    <th>Tournament</th>
                    <th>Date</th>
                    <th>See more</th>
                  </tr>
                </thead>
                <tbody>
                  {tournamentlist.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.points.tournament}</td>
                        <td>{item.date}</td>
                        <td>
                          <Link
                            to={`/admin/tournament?tournamentID=${item.id}`}
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
    </>
  );
};

export default TournamentList;
