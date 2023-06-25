package app.indusara.server.service;

import app.indusara.server.dao.TournamentRepository;
import app.indusara.server.entity.Tournament;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TournamentService implements ITournamentService{

    private final TournamentRepository tournamentRepository;
    @Override
    public Tournament getTournament(Integer id) {
        Tournament tournament = null;
        Optional<Tournament> tournamentOptional = tournamentRepository.findById(id);
        if (tournamentOptional.isPresent()) {
            tournament = tournamentOptional.get();
        }
        return tournament;
    }
}
