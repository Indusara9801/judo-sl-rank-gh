import classes from "./Header.module.scss";
import Button from "../Utility/Button/Button";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../store/user/user-actions";
import {
  Route,
  NavLink,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { userActions } from "../../store/user/user";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const clickHandler = (event) => {
    event.preventDefault();
    dispatch(signOutUser());
    dispatch(userActions.logOutUser());
    history.push("/login");
    
  };

  return (
    <header id={classes["section-header"]}>
      <div className={classes.header}>
        <div className={classes.header__container}>
          <div className={`${classes.header__logo} heading-light-2`}>
            JUDO RANKING
          </div>
          <div className={classes.header__action}>
            <div className={`${classes.header__action__nav} heading-light-6`}>
              <ul>
                <Route path={"/admin"}>
                  <li>
                    <NavLink
                      activeClassName={classes.active}
                      to="/admin/players"
                    >
                      Players
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeClassName={classes.active}
                      to="/admin/requests"
                    >
                      Requests
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeClassName={classes.active}
                      to="/admin/add"
                    >
                      Add Data
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeClassName={classes.active}
                      to="/admin/tournaments"
                    >
                      Tournaments
                    </NavLink>
                  </li>
                </Route>

                <Route path={"/home"}>
                  <li>
                    <NavLink
                      activeClassName={classes.active}
                      to="/home/ranking"
                    >
                      Ranking
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeClassName={classes.active}
                      to="/home/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                </Route>
              </ul>
            </div>
            <div className={classes.header__action__logout}>
              <Button
                title="Log Out"
                className="btn--secondary"
                onClick={clickHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
