package app.indusara.server.dto;

import app.indusara.server.entity.Division;
import app.indusara.server.entity.Ranking;
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
public class RankingDto {
    private Integer id;

    private SingleWeightClassPlayer player;

    private Division division;

    private Integer position;

    private Integer prevPosition;

    public RankingDto(Ranking ranking) {
        this.id = ranking.getId();
        this.player = new SingleWeightClassPlayer(ranking.getPlayer(), ranking.getDivision());
        this.division = ranking.getDivision();
        this.position = ranking.getPosition();
        this.prevPosition = ranking.getPrevPosition();
    }
}
