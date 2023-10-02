package app.indusara.server.rest;


import app.indusara.server.dto.TournamentPostDto;
import app.indusara.server.entity.Tournament;
import app.indusara.server.helper.TournamentWithDivision;
import app.indusara.server.service.ITournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public Tournament getTournament(@PathVariable Integer id) {
        return tournamentService.getTournament(id);
    }

    @PostMapping("/tournaments")
    public void save(@RequestBody TournamentPostDto tournamentPostDto) {
        tournamentService.save(new TournamentWithDivision(tournamentPostDto));

    }
}
