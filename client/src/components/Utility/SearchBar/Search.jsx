import { useState } from "react";
import classes from "./Search.module.scss";
import Request from "../RequestCard/RequestCard";
import { searchItems } from "../../../constants";
import Player from "../PlayerCard/PlayerCard";

const Search = ({ list, item, placeholder }) => {
  const [searchString, setSearchString] = useState("");

  console.log("LIST ---> ", list);

  const valueChangeHandler = (event) => {
    event.preventDefault();
    setSearchString(event.target.value);
  };

  return (
    <div className={classes.search}>
      <div className={classes.search__input}>
        <input
          type="text"
          onChange={valueChangeHandler}
          value={searchString}
          placeholder={placeholder}
        />
      </div>
      <div className={classes.search__results}>
        {list
          .filter((item) =>
            item.player.displayName.toLowerCase().includes(searchString.toLowerCase())
          )
          .map((element) => {
            return item === searchItems.REQUEST ? (
              <Request user={element} key={element.id} />
            ) : (
              <Player player={element} key={element.id} />
            );
          })}
      </div>
    </div>
  );
};

export default Search;
