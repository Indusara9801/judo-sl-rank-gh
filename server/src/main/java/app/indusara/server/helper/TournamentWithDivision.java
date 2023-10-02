package app.indusara.server.helper;

import app.indusara.server.dto.TournamentPostDto;
import app.indusara.server.entity.Tournament;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@JsonSerialize
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TournamentWithDivision {
    private Tournament tournament;
    private Map<Integer, Boolean> thirdPlaceMatchesMale;
    private Map<Integer, Boolean> thirdPlaceMatchesFemale;

    public TournamentWithDivision(TournamentPostDto tournamentPostDto) {
        this.tournament = tournamentPostDto.getTournament();
        this.thirdPlaceMatchesMale = convertStringToMap(tournamentPostDto.getThirdPlaceMatchesMale());
        this.thirdPlaceMatchesFemale = convertStringToMap(tournamentPostDto.getThirdPlaceMatchesFemale());
    }

    private Map<Integer, Boolean> convertStringToMap(String json) {
        return Arrays.stream(json.split(",")).map(entry -> entry.split(":")).collect(Collectors.toMap(parts -> Integer.parseInt(parts[0]), parts -> Boolean.valueOf(parts[1])));
    }

}
