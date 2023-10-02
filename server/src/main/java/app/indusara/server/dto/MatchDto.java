package app.indusara.server.dto;

import app.indusara.server.entity.Match;
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
public class MatchDto {
    private Match match;
    private Integer tournamentId;
    private Integer weightClass;
    private String gender;
}
