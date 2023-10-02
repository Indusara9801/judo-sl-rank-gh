import classes from "./DivisionPicker.module.scss";
import { maleWeightClassList, femaleWeightClassList } from "../../constants";
import { useState } from "react";

const DivisionPicker = ({ defaultValue, onClickRadio }) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);
  return (
    <div className={classes.division_picker}>
      <div
        className={`${classes.division_picker__col} ${classes["division_picker__col--left"]}`}
      >
        <div
          className={`${classes.division_picker__item} ${classes["division_picker__item--header"]}`}
        >
          Male
        </div>
        {maleWeightClassList.map((item, index) => {
          return (
            <div key={index} className={classes.division_picker__item}>
              <input
                type="radio"
                name="division"
                className={classes.division_picker__item__input}
                id={item.value}
                value={JSON.stringify({
                  division: "male",
                  weightClass: item.value,
                })}
                checked={
                  JSON.parse(currentValue).division === "male" &&
                  JSON.parse(currentValue).weightClass === item.value
                }
                onChange={(e) => {
                  setCurrentValue(e.target.value);
                  onClickRadio(JSON.parse(e.target.value));
                }}
              />
              <label
                htmlFor={item.value}
                className={classes.division_picker__item__label}
              >
                {item.label}
              </label>
            </div>
          );
        })}
      </div>

      <div
        className={`${classes.division_picker__col} ${classes["division_picker__col--right"]}`}
      >
        <div
          className={`${classes.division_picker__item} ${classes["division_picker__item--header"]}`}
        >
          Female
        </div>
        {femaleWeightClassList.map((item, index) => {
          return (
            <div key={index} className={classes.division_picker__item}>
              <input
                type="radio"
                name="division"
                className={classes.division_picker__item__input}
                id={item.value}
                value={JSON.stringify({
                  division: "female",
                  weightClass: item.value,
                })}
                checked={
                  JSON.parse(currentValue).division === "female" &&
                  JSON.parse(currentValue).weightClass === item.value
                }
                onChange={(e) => {
                  setCurrentValue(e.target.value);
                  onClickRadio(JSON.parse(e.target.value));
                }}
              />
              <label
                htmlFor={item.value}
                className={classes.division_picker__item__label}
              >
                {item.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DivisionPicker;
