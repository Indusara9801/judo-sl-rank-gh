package app.indusara.server.dto;

import app.indusara.server.entity.Division;
import app.indusara.server.entity.Match;
import app.indusara.server.entity.MatchDetail;
import app.indusara.server.helper.WinnerLoser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@JsonSerialize
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BracketEntry {
    private Integer id;
    private String name;
    private Division division;
    private Integer tier;
    private Double time;
    private MatchDetail player1;
    private MatchDetail player2;


    public BracketEntry(Match match) {
        this.id = match.getId();
        this.name = match.getName();
        this.tier = match.getTier();
        this.division = match.getTournamentDivision().getDivision();
        this.time = match.getTime();
        this.player1 = match.getMatchPlayer1();
        this.player2 = match.getMatchPlayer2();
    }

    @JsonIgnore
    @Transient
    public WinnerLoser getWinnerAndLoser() {
        WinnerLoser winnerLoser = new WinnerLoser();
        if (player1.getWon()) {
            winnerLoser.setWinner(player1.getPlayerId());
            winnerLoser.setWinnerInDb(player1.getPlayerInDb());
            winnerLoser.setLoser(player2.getPlayerId());
            winnerLoser.setLoserInDb(player2.getPlayerInDb());
        } else {
            winnerLoser.setWinner(player2.getPlayerId());
            winnerLoser.setWinnerInDb(player2.getPlayerInDb());
            winnerLoser.setLoser(player1.getPlayerId());
            winnerLoser.setLoserInDb(player1.getPlayerInDb());
        }
        return winnerLoser;
    }
}
