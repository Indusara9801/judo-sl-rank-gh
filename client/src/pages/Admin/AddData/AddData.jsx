import AddBanner from "../../../components/AddData/AddBanner";
import Header from "../../../components/Header/Header";
import image from "../../../assets/trophy.jpg";
import match from "../../../assets/match.jpg";
import positions from "../../../assets/positions.jpg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddTournament from "./AddTournament";
import AddMatch from "./AddMatch";
import CalculatePositions from "./CalculatePositions";

const AddData = () => {
  const history = useHistory();

  return (
    <>
      <Header />
      <section id="section-add">
        <div className="add-data">
          <AddBanner
            title={"Add Tournament"}
            image={image}
            onClick={() => {
              history.replace(
                history.location.pathname === "/admin/add/tournament"
                  ? "/admin/add"
                  : "/admin/add/tournament"
              );
            }}
          />
          <AddTournament />
          <AddBanner
            title={"Add Match"}
            image={match}
            onClick={() => {
              history.replace(
                history.location.pathname === "/admin/add/match"
                  ? "/admin/add"
                  : "/admin/add/match"
              );
            }}
          />
          <AddMatch />
          <AddBanner
            title={"Calculate Positions"}
            image={positions}
            onClick={() => {
              history.replace(
                history.location.pathname === "/admin/add/positions"
                  ? "/admin/add"
                  : "/admin/add/positions"
              );
            }}
          />
          <CalculatePositions />
        </div>
      </section>
    </>
  );
};

export default AddData;
