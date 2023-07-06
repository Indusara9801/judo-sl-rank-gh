package app.indusara.server.service;

import app.indusara.server.dao.TournamentRepository;
import app.indusara.server.dto.FullTournament;
import app.indusara.server.entity.Tournament;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TournamentService implements ITournamentService {

    private final TournamentRepository tournamentRepository;
    private final IMatchService matchService;

    @Override
    public FullTournament getTournament(Integer id) {
        Tournament tournament = null;
        Optional<Tournament> tournamentOptional = tournamentRepository.findById(id);
        if (tournamentOptional.isPresent()) {
            tournament = tournamentOptional.get();
        }
        return new FullTournament(tournament, matchService.getMatchByTournament(tournament));
    }

    @Override
    public List<Tournament> getTournamentsByYear(String year) {
        return tournamentRepository.findAllByYear(year);
    }
}
