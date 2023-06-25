package app.indusara.server.rest;

import app.indusara.server.dto.PlayerTournamentDto;
import app.indusara.server.dto.TournamentPlay;
import app.indusara.server.service.IPlayerTournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PlayerTournamentController {
    private final IPlayerTournamentService playerTournamentService;

    @GetMapping("/playerTournament/{playerId}/{year}")
    public List<PlayerTournamentDto> getPlayerTournament(@PathVariable Integer playerId, @PathVariable String year) {
        return playerTournamentService.getPlayerTournaments(playerId, year);

    }
}
