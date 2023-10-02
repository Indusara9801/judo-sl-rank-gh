import classes from "./PositionBanner.module.scss";
import { LiaMedalSolid } from "react-icons/lia";
import { BsCircle } from "react-icons/bs";
import image from "../../assets/user.png";

const PositionBanner = ({ participants }) => {
  let iconClass = "position_banner__icon";

  switch (participants.position) {
    case 1: {
      iconClass = "position_banner__icon--gold";
      break;
    }
    case 2: {
      iconClass = "position_banner__icon--silver";
      break;
    }
    case 3: {
      iconClass = "position_banner__icon--bronze";
      break;
    }
  }

  console.log(participants);

  return (
    <>
      <div className={classes.position_banner}>
        <div className={classes.position_banner__position}>
          {participants.position > 3 ? (
            <BsCircle className={classes[iconClass]} />
          ) : (
            <LiaMedalSolid className={classes[iconClass]} />
          )}

          <div className="heading-light-5">{participants.position}</div>
        </div>
        <div className={classes.position_banner__player}>
          <img src={image} className={classes.position_banner__player__image} />
          {participants.player ? (
            <div className={classes.position_banner__player__db_player}>
              <div className="heading-dark-5">
                {participants.player.fullName}
              </div>
            </div>
          ) : (
            <div className={classes.position_banner__player__non_db_player}>
              <div className="heading-dark-5">{participants.nonDbPlayer}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PositionBanner;
