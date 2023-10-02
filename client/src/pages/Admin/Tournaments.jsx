import Header from "../../components/Header/Header";
import TournamentList from "../../components/Functionality/TournamentList/TournamentList";
import { tournamentListTypes } from "../../constants";

const Tournaments = () => {
  return (
    <>
      <div className="flex-start-center-column">
        <TournamentList header={<Header />} type={tournamentListTypes.ALL} />
      </div>
    </>
  );
};

export default Tournaments;
