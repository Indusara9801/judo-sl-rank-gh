package app.indusara.server.dto;

import app.indusara.server.entity.Division;
import app.indusara.server.entity.Player;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Objects;

@Component
@JsonSerialize
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SingleWeightClassPlayer {
    private Integer id;

    private String fullName;

    private String displayName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dob;

    private String clubName;

    private String province;

    private String judoGrade;

    private DivisionLessPlayerStat playerStat;

    public SingleWeightClassPlayer(Player player, Division division) {
        this.id = player.getId();
        this.fullName = player.getFullName();
        this.displayName = player.getDisplayName();
        this.dob = player.getDob();
        this.clubName = player.getClubName();
        this.province = player.getProvince();
        this.judoGrade = player.getJudoGrade();
        player.getPlayerStat().forEach(currentPlayerStat -> {
            if (Objects.equals(currentPlayerStat.getDivision().getId(), division.getId())) {
                this.playerStat = new DivisionLessPlayerStat(currentPlayerStat);
            }
        });
    }
}
