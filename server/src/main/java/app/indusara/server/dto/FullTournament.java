package app.indusara.server.dto;

import app.indusara.server.entity.Match;
import app.indusara.server.entity.Tournament;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@JsonSerialize
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FullTournament {
    private Tournament tournament;
    private List<Match> matches;

}
