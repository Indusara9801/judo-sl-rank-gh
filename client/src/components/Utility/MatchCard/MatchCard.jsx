import { useState } from "react";
import classes from "./MatchCard.module.scss";
import MatchDetail from "./MatchDetail";

const MatchCard = ({ match }) => {
  const [detailToggle, setDetailToggle] = useState(false);
  console.log(detailToggle);
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
      {detailToggle && <MatchDetail mid={match.mid} />}
    </>
  );
};

export default MatchCard;
