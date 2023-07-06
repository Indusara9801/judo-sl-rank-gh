package app.indusara.server.dao;

import app.indusara.server.entity.Match;
import app.indusara.server.entity.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Integer> {
    List<Match> findAllByTournament(Tournament tournament);
}
