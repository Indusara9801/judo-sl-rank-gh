package app.indusara.server.service;

import app.indusara.server.dao.IPlayerTournamentRepository;
import app.indusara.server.dto.PlayerTournamentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerTournamentService implements IPlayerTournamentService {

    private final IPlayerTournamentRepository playerTournamentRepository;

    @Override
    public List<PlayerTournamentDto> getPlayerTournaments(Integer playerId, String year) {
        return playerTournamentRepository.getPlayerTournaments(playerId, year);
    }
}
