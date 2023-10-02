package app.indusara.server.dao;

import app.indusara.server.dto.PlayerTournamentDto;
import app.indusara.server.entity.Division;
import app.indusara.server.entity.Participate;
import app.indusara.server.entity.Tournament;
import app.indusara.server.entity.TournamentDivision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface ParticipateRepository extends JpaRepository<Participate, Integer> {
    @Query(value = "get_player_tournaments", nativeQuery = true)
    List<PlayerTournamentDto> getTournamentPlayByDateAndPlayer(
            @Param("playerId") Integer playerId,
            @Param("year") String year
    );

    List<Participate> getParticipatesByTournamentDivision(TournamentDivision tournamentDivision);

}
