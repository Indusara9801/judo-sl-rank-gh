import { useHistory } from "react-router-dom";
import classes from "./PlayerCard.module.scss";

const PlayerCard = ({ player }) => {
  const history = useHistory();

  console.log("In PLAYER CARD -> ", player)

  let stripeClass = "player-card__stripe--" + player.player.judoGrade.toLowerCase(); 

  console.log(player)

  const clickHandler = () => {
    history.push(`/admin/players/${player.player.id}`);
  };
  return (
    <div className={classes["player-card"]} onClick={clickHandler}>
      <div className={classes["player-card__text"]}>
        <div className="heading-dark-5">{player.player.displayName}</div>
        <div className="heading-dark-7">{player.player.fullName}</div>
      </div>
      <div className={classes[`${stripeClass}`]}></div>
    </div>
  );
};

export default PlayerCard;
