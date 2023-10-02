import classes from "./RankingBanner.module.scss";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaEquals } from "react-icons/fa";

const RankingBanner = ({ ranking }) => {
  console.log(ranking);
  return (
    <div className={classes.ranking_banner}>
      <div className={classes.ranking_banner__place}>
        <div className="heading-dark-6">{ranking.position}</div>
      </div>
      <div className={classes.ranking_banner__change}>
        {ranking.prevPosition - ranking.position === 0 && (
          <FaEquals className={classes.equal} />
        )}
        {ranking.prevPosition - ranking.position < 0 && (
          <ImArrowDown className={classes.down} />
        )}
        {ranking.prevPosition - ranking.position > 0 && (
          <ImArrowUp className={classes.up} />
        )}
        <div className="heading-dark-6">
          {ranking.prevPosition - ranking.position !== 0 &&
            ranking.prevPosition - ranking.position}
        </div>
      </div>
      <div className={classes.ranking_banner__player}>
        <div className="heading-dark-6">{ranking.player.fullName}</div>
      </div>
      <div className={classes.ranking_banner__club}>
        <div className="heading-dark-6">{ranking.player.clubName}</div>
      </div>
      <div className={classes.ranking_banner__points}>
        <div className="heading-dark-6">{ranking.player.playerStat.points}</div>
      </div>
      <div className={classes.ranking_banner__wins}>
        <div className="heading-dark-6">{ranking.player.playerStat.wins}</div>
      </div>
      <div className={classes.ranking_banner__losses}>
        <div className="heading-dark-6">{ranking.player.playerStat.losses}</div>
      </div>
    </div>
  );
};

export default RankingBanner;
