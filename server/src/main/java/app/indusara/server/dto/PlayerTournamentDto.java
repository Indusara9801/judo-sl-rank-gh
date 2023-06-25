package app.indusara.server.dto;

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
public class PlayerTournamentDto {
    private Integer tournamentId;
    private String tournament;
    private LocalDate date;
    private String year;
    private Integer position;


}
