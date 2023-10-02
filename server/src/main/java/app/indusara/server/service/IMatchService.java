package app.indusara.server.service;

import app.indusara.server.dto.BracketEntry;
import app.indusara.server.dto.MatchDto;
import app.indusara.server.dto.PlayerWrapper;
import app.indusara.server.entity.Match;
import app.indusara.server.entity.TournamentDivision;
import app.indusara.server.validator.Gender;

import java.util.List;
import java.util.Map;

public interface IMatchService {
    List<Match> getMatchByTournamentDivision(TournamentDivision tournamentDivision);

    void saveMatch(MatchDto match);

    Map<String, Map<Integer, Map<Integer, List<BracketEntry>>>> createBracket(Integer tournamentId);

    Map<Integer, List<PlayerWrapper>> getPositions(Integer tournamentId, Gender division, Integer weightClass);

}
