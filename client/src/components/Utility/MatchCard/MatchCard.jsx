import { useState } from "react";
import classes from "./MatchCard.module.scss";
import MatchDetail from "./MatchDetail";

const MatchCard = ({ match }) => {
  const [detailToggle, setDetailToggle] = useState(false);
  return (
    <>
      <div
        className={classes.matchcard}
        onClick={() => {
          setDetailToggle((prevState) => {
            return !prevState;
          });
        }}
      >
        <div className={`${classes.matchcard__summary}`}>
          <div className="heading-dark-5">{match.name}</div>
          <div className="heading-dark-5">
            ({Math.floor(match.time / 60)}m
            {match.time - Math.floor(match.time / 60) * 60}s)
          </div>
        </div>
      </div>
      {detailToggle && (
        <MatchDetail
          match={{
            matchDetails: { name: match.name, time: match.time },
            player1: match.player1,
            player2: match.player2,
          }}
        />
      )}
    </>
  );
};

export default MatchCard;
