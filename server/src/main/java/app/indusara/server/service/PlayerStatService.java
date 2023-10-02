package app.indusara.server.service;

import app.indusara.server.dao.PlayerStatRepository;
import app.indusara.server.dto.PlayerStatDto;
import app.indusara.server.entity.Division;
import app.indusara.server.entity.PlayerStat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerStatService implements IPlayerStatService {
    private final PlayerStatRepository playerStatRepository;


    @Override
    public void saveOrUpdate(PlayerStat playerStat) {
        playerStatRepository.save(playerStat);
    }

    @Override
    public List<PlayerStatDto> findAllByDivision(Division division) {
        return playerStatRepository.findAllByDivision(division).stream().map(PlayerStatDto::new).toList();
    }
}
