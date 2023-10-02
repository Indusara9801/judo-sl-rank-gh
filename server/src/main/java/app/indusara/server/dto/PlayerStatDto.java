package app.indusara.server.dto;

import app.indusara.server.entity.Division;
import app.indusara.server.entity.PlayerStat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@JsonSerialize
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerStatDto {
    private Integer id;

    private Integer wins;

    private Integer losses;

    private Integer points;

    private PlayerDto player;

    private Division division;

    private Integer currentPosition;

    public PlayerStatDto(PlayerStat playerStat) {
        this.id = playerStat.getId();
        this.wins = playerStat.getWins();
        this.losses = playerStat.getLosses();
        this.points = playerStat.getPoints();
        this.player = new PlayerDto(playerStat.getPlayer());
        this.division = playerStat.getDivision();
    }
}
