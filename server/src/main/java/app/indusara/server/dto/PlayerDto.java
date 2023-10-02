package app.indusara.server.dto;

import app.indusara.server.entity.Player;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@JsonSerialize
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDto {

    private Integer id;

    private String fullName;

    private String displayName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dob;

    private String clubName;

    private String province;

    private String judoGrade;

    public PlayerDto(Player player) {
        this.id = player.getId();
        this.fullName = player.getFullName();
        this.displayName = player.getDisplayName();
        this.dob = player.getDob();
        this.clubName = player.getClubName();
        this.province = player.getProvince();
        this.judoGrade = player.getJudoGrade();
    }
}
