import Header from "../../components/Header/Header";
import TournamentList from "../../components/Functionality/TournamentList/TournamentList";
import { tournamentListTypes } from "../../constants";

const Tournaments = () => {
  return (
    <>
      <Header />
      <TournamentList type={tournamentListTypes.ALL} />
    </>
  );
};

export default Tournaments;
