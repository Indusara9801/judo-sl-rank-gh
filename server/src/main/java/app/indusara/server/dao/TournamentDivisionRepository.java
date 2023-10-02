package app.indusara.server.dao;

import app.indusara.server.entity.Division;
import app.indusara.server.entity.Tournament;
import app.indusara.server.entity.TournamentDivision;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TournamentDivisionRepository extends JpaRepository<TournamentDivision, Integer> {
    TournamentDivision findByTournamentAndDivision(Tournament tournament, Division division);
}
