package app.indusara.server.dao;
import app.indusara.server.dto.PlayerTournamentDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@RequiredArgsConstructor
public class PlayerTournamentRepository implements IPlayerTournamentRepository{

    private final EntityManager entityManager;

    public List<PlayerTournamentDto> getPlayerTournaments(Integer playerId, String year) {
        Query query = entityManager.createNamedQuery("get_player_tournaments");
        query.setParameter("playerId", playerId);
        query.setParameter("year", year);
        return query.getResultList();
    }

}
