import { forwardRef, useState, useImperativeHandle } from "react";
import classes from "./SearchDropDown.module.scss";

const SearchDorpDown = forwardRef(({ data }, ref) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("");

  const filteredList = data.filter((item) =>
    item.email.toLowerCase().includes(currentPlayer.toLocaleLowerCase())
  );

  const reset = () => {
    setShowDropDown(false);
    setCurrentPlayer("");
  };

  useImperativeHandle(ref, () => {
    return {
      value: currentPlayer,
      inDB: filteredList.length > 0,
      reset: reset,
    };
  });

  console.log(currentPlayer);
  return (
    <div
      className={`${classes.search_dropdown} ${
        filteredList.length === 0 && classes.message
      }`}
    >
      <input
        type="text"
        className={classes.search_dropdown__input}
        value={currentPlayer}
        ref={ref}
        onFocus={() => {
          setShowDropDown(true);
        }}
        onChange={(e) => {
          setCurrentPlayer(e.target.value);
        }}
      />

      {showDropDown && filteredList.length > 0 && (
        <div className={classes.search_dropdown__input__dropdown}>
          {filteredList.map((player) => {
            if (filteredList.length === 0) {
              setShowDropDown(false);
            }
            console.log(filteredList.length);

            return (
              <div
                key={player.id}
                className={classes.search_dropdown__input__dropdown__item}
                onClick={() => {
                  setCurrentPlayer(player.email);
                  setShowDropDown(false);
                }}
              >
                {player.email}
              </div>
            );
          })}
        </div>
      )}
      {filteredList.length === 0 && (
        <div className={classes["message-text"]}>
          Player Not found in database
        </div>
      )}
    </div>
  );
});

SearchDorpDown.displayName = "SearchDropDown";

export default SearchDorpDown;
