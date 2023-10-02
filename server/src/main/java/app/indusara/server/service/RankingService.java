package app.indusara.server.service;

import app.indusara.server.dao.RankingRepository;
import app.indusara.server.dto.PlayerStatDto;
import app.indusara.server.dto.RankingDto;
import app.indusara.server.entity.Division;
import app.indusara.server.entity.Ranking;
import app.indusara.server.validator.Gender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class RankingService implements IRankingService {
    private final RankingRepository rankingRepository;
    private final IDivisionService divisionService;
    private final IPlayerStatService playerStatService;
    private final IPlayerService playerService;


    @Override
    public void rankByGenderAndWeightClass(Gender gender, Integer weightClass) {
        Division division = divisionService.getDivisionByGenderAndWeightClass(gender.name(), weightClass);
        rankDivision(division);
    }

    @Override
    public void rankAll() {
        divisionService.getAllDivisions().stream().peek(System.out::println).forEach(this::rankDivision);
    }

    @Override
    public Map<String, Map<Integer, Map<Integer, List<RankingDto>>>> getAll() {

        return rankingRepository.findAll().stream().map(RankingDto::new).collect(Collectors.groupingBy(ranking -> ranking.getDivision().getGender(), Collectors.groupingBy(ranking -> ranking.getDivision().getWeightClass(), Collectors.groupingBy(RankingDto::getPosition))));
    }

    private void rankDivision(Division division) {
        Map<Integer, List<Ranking>> currentRankings = rankingRepository.findAllByDivision(division).stream().collect(Collectors.groupingBy(ranking -> ranking.getPlayer().getId()));
        List<PlayerStatDto> playerStats = playerStatService.findAllByDivision(division).stream().sorted(Comparator.comparing(PlayerStatDto::getPoints).thenComparing(PlayerStatDto::getWins).reversed()).toList();
        IntStream.range(0, playerStats.size())
                .forEach(index -> playerStats.get(index).setCurrentPosition(index + 1));
        for (PlayerStatDto playerStat : playerStats) {
            Integer playerId = playerStat.getPlayer().getId();
            Ranking currentRank = null;
            if (currentRankings.containsKey(playerId)) {
                currentRank = currentRankings.get(playerId).get(0);
                currentRank.setPrevPosition(currentRank.getPosition());
                currentRank.setPosition(playerStat.getCurrentPosition());
            } else {
                currentRank = new Ranking(playerService.getPlayer(playerId), division, playerStat.getCurrentPosition(), 0);
            }
            rankingRepository.save(currentRank);
        }
    }
}
