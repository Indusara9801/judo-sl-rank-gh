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
        <div className={`${classes.matchcard__summary} mt-5`}>
          <div className="heading-dark-5">{match.name}</div>
        </div>
      </div>
      {detailToggle && (
        <MatchDetail
          match={{ player1: match.matchPlayer1, player2: match.matchPlayer2 }}
        />
      )}
    </>
  );
};

export default MatchCard;
