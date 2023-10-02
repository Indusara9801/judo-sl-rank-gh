package app.indusara.server.dto;

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
public class PlayerWrapper {
    private String player;
    private Integer winsInCurrentTournament;
    private Integer lossesInCurrentTournament;
    private Boolean playerInDb;

}
