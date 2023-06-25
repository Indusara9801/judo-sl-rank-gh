package app.indusara.server.dao;


import app.indusara.server.dto.PlayerTournamentDto;

import java.util.List;

public interface IPlayerTournamentRepository {
    List<PlayerTournamentDto> getPlayerTournaments(Integer playerId, String year);
}
