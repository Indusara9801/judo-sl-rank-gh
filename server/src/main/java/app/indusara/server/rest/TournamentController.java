package app.indusara.server.rest;

import app.indusara.server.entity.Tournament;
import app.indusara.server.service.ITournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TournamentController {
    private final ITournamentService tournamentService;

    @GetMapping("/tournament/{id}")
    public Tournament getTournament(@PathVariable Integer id) {
        return tournamentService.getTournament(id);
    }
}
