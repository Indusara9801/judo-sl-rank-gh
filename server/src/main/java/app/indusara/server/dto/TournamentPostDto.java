package app.indusara.server.dto;

import app.indusara.server.entity.Tournament;
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
public class TournamentPostDto {
    private Tournament tournament;
    private String thirdPlaceMatchesMale;
    private String thirdPlaceMatchesFemale;
}
