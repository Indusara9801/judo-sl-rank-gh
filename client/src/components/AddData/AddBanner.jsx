import classes from "./AddBanner.module.scss";


const AddBanner = ({title, image, onClick}) => {
  return (
    <div className={classes.add} onClick={onClick}>
      <img className={classes.add__image} src={image} alt="img" />
      <div className={classes.add__text}>
        <h1 className="heading-dark-1">{title}</h1>
      </div>
    </div>
  );
};

export default AddBanner;
