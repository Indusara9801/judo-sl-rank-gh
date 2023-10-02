package app.indusara.server.service;

import app.indusara.server.dao.ParticipateRepository;
import app.indusara.server.dto.ParticipantDto;
import app.indusara.server.dto.PlayerWrapper;
import app.indusara.server.entity.*;
import app.indusara.server.validator.Gender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParticipateService implements IParticipateService {

    private final ParticipateRepository participateRepository;
    private final IMatchService matchService;
    private final IPlayerService playerService;
    private final ITournamentService tournamentService;
    private final IDivisionService divisionService;
    private final ITournamentDivisionService tournamentDivisionService;

    @Override
    public void save(Participate participate) {
        participateRepository.save(participate);
    }

    @Override
    public void addAll(Integer tournamentId, Gender division, Integer weightClass) {
        Map<Integer, List<PlayerWrapper>> positions = matchService.getPositions(tournamentId, division, weightClass);
        Tournament tournament = tournamentService.getTournament(tournamentId);
        Points points = tournament.getPoints();
        Map<Integer, Integer> positionPointMap = points.getPositionPointMap();
        Division playerDivision = divisionService.getDivisionByGenderAndWeightClass(division.name(), weightClass);
        TournamentDivision tournamentDivision = tournamentDivisionService.findByTournamentAndDivision(tournament, playerDivision);
        positions.forEach((position, matches) -> matches.forEach(playerWrapper -> {
            if (playerWrapper.getPlayerInDb()) {
                Player player = playerService.getPlayerByEmail(playerWrapper.getPlayer());
                var playerStatMap = player.getPlayerStat().stream().collect(Collectors.groupingBy(playerStatistics -> playerStatistics.getDivision().getGender(), Collectors.groupingBy(playerStatistics -> playerStatistics.getDivision().getWeightClass())));
                PlayerStat playerStat = playerStatMap.get(division.name()).get(weightClass).get(0);
                playerStat.setWins(playerStat.getWins() + playerWrapper.getWinsInCurrentTournament());
                playerStat.setLosses(playerStat.getLosses() + playerWrapper.getLossesInCurrentTournament());
                playerStat.setPoints(playerStat.getPoints() + positionPointMap.get(position));
                save(new Participate(position, player, tournamentDivision));
            } else {
                save(new Participate(position, playerWrapper.getPlayer(), tournamentDivision));
            }
        }));
    }

    @Override
    public Map<Integer, List<ParticipantDto>> getParticipate(Integer tournamentId, Gender division, Integer weightClass) {
        Tournament tournament = tournamentService.getTournament(tournamentId);
        Division playerDivision = divisionService.getDivisionByGenderAndWeightClass(division.name(), weightClass);
        TournamentDivision tournamentDivision = tournamentDivisionService.findByTournamentAndDivision(tournament, playerDivision);
        List<Participate> participants = participateRepository.getParticipatesByTournamentDivision(tournamentDivision);
        return participants.stream().map(ParticipantDto::new).collect(Collectors.groupingBy(ParticipantDto::getPosition));
    }

}
