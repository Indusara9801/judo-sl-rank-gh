package app.indusara.server.dao;

import app.indusara.server.dto.PlayerTournamentDto;
import app.indusara.server.dto.TournamentPlay;
import app.indusara.server.entity.Participate;
import jakarta.persistence.NamedNativeQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.history.RevisionRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParticipateRepository extends JpaRepository<Participate, Integer> {
    @Query(value = "get_player_tournaments", nativeQuery = true)
    List<PlayerTournamentDto> getTournamentPlayByDateAndPlayer(
            @Param("playerId") Integer playerId,
            @Param("year") String year
    );
}
