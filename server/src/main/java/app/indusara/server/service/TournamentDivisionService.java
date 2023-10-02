package app.indusara.server.service;

import app.indusara.server.dao.TournamentDivisionRepository;
import app.indusara.server.entity.Division;
import app.indusara.server.entity.Tournament;
import app.indusara.server.entity.TournamentDivision;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TournamentDivisionService implements ITournamentDivisionService {
    private final TournamentDivisionRepository tournamentDivisionRepository;

    @Override
    public TournamentDivision findByTournamentAndDivision(Tournament tournament, Division division) {
        return tournamentDivisionRepository.findByTournamentAndDivision(tournament, division);
    }

    @Override
    public void save(TournamentDivision tournamentDivision) {
        tournamentDivisionRepository.save(tournamentDivision);
    }
}
