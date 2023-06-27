import { useState } from "react";
import classes from "./TabBar.module.scss";
import { v4 as uuidv4 } from "uuid";

const TabBar = ({ valueList, onClickRadio, defaultVal, width }) => {
  const [currVal, setCurrValue] = useState(defaultVal);

  return (
    <div className={classes.navbar}>
      <div className={classes.navbar__tabbar}>
        {valueList.map((val, index) => {
          const uniqueVal = uuidv4();
          return (
            <label
              key={index}
              htmlFor={`item_${index}_${uniqueVal}`}
              className={classes.navbar__tabbar__tab}
              style={{ width }}
            >
              <input
                type="radio"
                className={classes.navbar__tabbar__tab__input}
                name="menu"
                id={`item_${index}_${uniqueVal}`}
                value={val}
                checked={val === currVal}
                onChange={() => {
                  setCurrValue(val);
                  onClickRadio(val);
                }}
              />
              <div className={classes.navbar__tabbar__tab__block_background}>
                <div className={classes.navbar__tabbar__tab__block}>{val}</div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
