package app.indusara.server.service;

import app.indusara.server.dao.MatchRepository;
import app.indusara.server.dto.BracketEntry;
import app.indusara.server.dto.MatchDto;
import app.indusara.server.dto.PlayerWrapper;
import app.indusara.server.entity.Division;
import app.indusara.server.entity.Match;
import app.indusara.server.entity.Tournament;
import app.indusara.server.entity.TournamentDivision;
import app.indusara.server.helper.WinnerLoser;
import app.indusara.server.helper.WinsAndLosses;
import app.indusara.server.validator.Gender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class MatchService implements IMatchService {

    private final MatchRepository matchRepository;
    private final ITournamentService tournamentService;
    private final ITournamentDivisionService tournamentDivisionService;
    private final IDivisionService divisionService;

    @Override
    public List<Match> getMatchByTournamentDivision(TournamentDivision tournamentDivision) {
        return matchRepository.findAllByTournamentDivision(tournamentDivision);
    }

    @Override
    public void saveMatch(MatchDto match) {
        Tournament tournament = tournamentService.getTournament(match.getTournamentId());
        Division division = divisionService.getDivisionByGenderAndWeightClass(match.getGender(), match.getWeightClass());
        TournamentDivision tournamentDivision = tournamentDivisionService.findByTournamentAndDivision(tournament, division);
        match.getMatch().setTournamentDivision(tournamentDivision);
        matchRepository.save(match.getMatch());
    }

    @Override
    public Map<String, Map<Integer, Map<Integer, List<BracketEntry>>>> createBracket(Integer tournamentId) {
        Tournament tournament = tournamentService.getTournament(tournamentId);
        List<Division> divisions = divisionService.getAllDivisions();
        List<Match> matches = new ArrayList<>();
        divisions.forEach(division -> {
            matches.addAll(getMatchByTournamentDivision(tournamentDivisionService.findByTournamentAndDivision(tournament, division)));
        });

        System.out.println(matches.size());
        return matches.stream().map(BracketEntry::new).collect(Collectors.groupingBy(bracketEntry -> bracketEntry.getDivision().getGender(), Collectors.groupingBy(bracketEntry -> bracketEntry.getDivision().getWeightClass(), Collectors.groupingBy(BracketEntry::getTier, () -> new TreeMap<>(Comparator.reverseOrder()), Collectors.toList()))));
    }

    private Map<String, WinsAndLosses> getPlayerWinsAndLosses(Integer tournamentId, Gender division, Integer weightClass) {
        Map<String, Map<Integer, Map<Integer, List<BracketEntry>>>> matches = createBracket(tournamentId);
        Map<Integer, List<BracketEntry>> selectedMatches = matches.get(division.name()).get(weightClass);
        List<WinnerLoser> winnerLoserList = selectedMatches.keySet().stream().flatMap(key -> selectedMatches.get(key).stream().map(BracketEntry::getWinnerAndLoser)).toList();
        Map<String, WinsAndLosses> winsAndLossesMap = new HashMap<>();

        for (WinnerLoser winnerLoser : winnerLoserList) {
            if (winsAndLossesMap.containsKey(winnerLoser.getWinner())) {
                WinsAndLosses winsAndLosses = winsAndLossesMap.get(winnerLoser.getWinner());
                winsAndLosses.setCurrentWins(winsAndLosses.getCurrentWins() + 1);
            } else {
                winsAndLossesMap.put(winnerLoser.getWinner(), new WinsAndLosses(1, 0));
            }

            if (winsAndLossesMap.containsKey(winnerLoser.getLoser())) {
                WinsAndLosses winsAndLosses = winsAndLossesMap.get(winnerLoser.getLoser());
                winsAndLosses.setCurrentLosses(winsAndLosses.getCurrentLosses() + 1);
            } else {
                winsAndLossesMap.put(winnerLoser.getLoser(), new WinsAndLosses(0, 1));
            }
        }

        return winsAndLossesMap;
    }

    @Override
    public Map<Integer, List<PlayerWrapper>> getPositions(Integer tournamentId, Gender division, Integer weightClass) {
        Map<String, WinsAndLosses> playerWinsAndLosses = getPlayerWinsAndLosses(tournamentId, division, weightClass);
        Division playerDivision = divisionService.getDivisionByGenderAndWeightClass(division.name(), weightClass);
        Tournament tournament = tournamentService.getTournament(tournamentId);
        TournamentDivision tournamentDivision = tournamentDivisionService.findByTournamentAndDivision(tournament, playerDivision);
        Map<String, Map<Integer, Map<Integer, List<BracketEntry>>>> matches = createBracket(tournamentId);
        Map<Integer, List<BracketEntry>> selectedMatches = matches.get(division.name()).get(weightClass);
        Integer max = selectedMatches.keySet().stream().max(Comparator.naturalOrder()).orElse(null);
        Map<Integer, List<PlayerWrapper>> positions = Stream.iterate(1, i -> i + 1).limit(11).collect(Collectors.toMap(key -> key, key -> new ArrayList<>()));
        if (max != null) {
            int currentTier = max;
            List<BracketEntry> finals = selectedMatches.get(currentTier--);
            int position = 1;
            positions.get(position++).add(new PlayerWrapper(finals.get(0).getWinnerAndLoser().getWinner(), playerWinsAndLosses.get(finals.get(0).getWinnerAndLoser().getWinner()).getCurrentWins(), playerWinsAndLosses.get(finals.get(0).getWinnerAndLoser().getWinner()).getCurrentLosses(), finals.get(0).getWinnerAndLoser().getWinnerInDb()));
            positions.get(position++).add(new PlayerWrapper(finals.get(0).getWinnerAndLoser().getLoser(), playerWinsAndLosses.get(finals.get(0).getWinnerAndLoser().getLoser()).getCurrentWins(), playerWinsAndLosses.get(finals.get(0).getWinnerAndLoser().getLoser()).getCurrentLosses(), finals.get(0).getWinnerAndLoser().getLoserInDb()));
            if (tournamentDivision.getThirdPlaceMatch()) {
                List<BracketEntry> third = selectedMatches.get(currentTier--);
                positions.get(position++).add(new PlayerWrapper(third.get(0).getWinnerAndLoser().getWinner(), playerWinsAndLosses.get(third.get(0).getWinnerAndLoser().getWinner()).getCurrentWins(), playerWinsAndLosses.get(third.get(0).getWinnerAndLoser().getWinner()).getCurrentLosses(), third.get(0).getWinnerAndLoser().getWinnerInDb()));
                positions.get(position++).add(new PlayerWrapper(third.get(0).getWinnerAndLoser().getLoser(), playerWinsAndLosses.get(third.get(0).getWinnerAndLoser().getLoser()).getCurrentWins(), playerWinsAndLosses.get(third.get(0).getWinnerAndLoser().getLoser()).getCurrentLosses(), third.get(0).getWinnerAndLoser().getLoserInDb()));
                --currentTier;
            }

            for (int i = currentTier; i > 0 && position <= 10; i--) {
                int count = 0;
                List<BracketEntry> nextRound = selectedMatches.get(i);

                for (BracketEntry match : nextRound) {
//                    System.out.println(match.getName());
                    positions.get(position).add(new PlayerWrapper(match.getWinnerAndLoser().getLoser(), playerWinsAndLosses.get(match.getWinnerAndLoser().getLoser()).getCurrentWins(), playerWinsAndLosses.get(match.getWinnerAndLoser().getLoser()).getCurrentLosses(), match.getWinnerAndLoser().getLoserInDb()));
                    count++;
                }
                position += count;
            }
        }

        return positions;
    }


}
