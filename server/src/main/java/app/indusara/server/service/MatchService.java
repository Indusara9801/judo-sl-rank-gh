package app.indusara.server.service;

import app.indusara.server.dao.MatchRepository;
import app.indusara.server.entity.Match;
import app.indusara.server.entity.Tournament;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchService implements IMatchService{

    private final MatchRepository matchRepository;

    @Override
    public List<Match> getMatchByTournament(Tournament tournament) {
        return matchRepository.findAllByTournament(tournament);
    }
}
