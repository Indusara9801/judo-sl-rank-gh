package app.indusara.server.service;

import app.indusara.server.dto.PlayerStatDto;
import app.indusara.server.entity.Division;
import app.indusara.server.entity.PlayerStat;

import java.util.List;

public interface IPlayerStatService {
    void saveOrUpdate(PlayerStat playerStat);
    List<PlayerStatDto> findAllByDivision(Division division);
}
