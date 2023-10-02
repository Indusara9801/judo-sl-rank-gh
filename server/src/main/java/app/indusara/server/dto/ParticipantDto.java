package app.indusara.server.dto;

import app.indusara.server.entity.Division;
import app.indusara.server.entity.Participate;
import app.indusara.server.entity.Player;
import app.indusara.server.entity.TournamentDivision;
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
public class ParticipantDto {
    private Integer id;
    private Integer position;
    private Player player;
    private String nonDbPlayer;
    private TournamentDivision tournamentDivision;

    public ParticipantDto(Participate participate) {
        this.id = participate.getId();
        this.position = participate.getPosition();
        this.player = participate.getPlayer();
        this.nonDbPlayer = participate.getNonDbPlayer();
        this.tournamentDivision = participate.getTournamentDivision();
    }
}
