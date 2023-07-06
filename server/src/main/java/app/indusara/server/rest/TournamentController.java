package app.indusara.server.rest;

import app.indusara.server.dto.FullTournament;
import app.indusara.server.entity.Tournament;
import app.indusara.server.service.ITournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TournamentController {
    private final ITournamentService tournamentService;

    @GetMapping("/tournaments/{year}")
    public List<Tournament> getTournaments(@PathVariable String year) {
        return tournamentService.getTournamentsByYear(year);
    }

    @GetMapping("/tournament/{id}")
    public FullTournament getTournament(@PathVariable Integer id) {
        return tournamentService.getTournament(id);
    }
}
