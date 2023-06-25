package app.indusara.server.service;

import app.indusara.server.dto.PlayerTournamentDto;
import app.indusara.server.dto.TournamentPlay;

import java.util.List;

public interface IPlayerTournamentService {
    public List<PlayerTournamentDto> getPlayerTournaments(Integer playerId, String year);
}
