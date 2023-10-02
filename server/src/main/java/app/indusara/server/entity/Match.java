package app.indusara.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Comparator;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Match implements Comparator<Match> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private Double time;

    private Integer tier;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "tournament_division_id")
    private TournamentDivision tournamentDivision;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "player1")
    private MatchDetail matchPlayer1;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "player2")
    private MatchDetail matchPlayer2;


    @Override
    public int compare(Match o1, Match o2) {
        return o1.getTier().compareTo(o2.getTier());
    }
}
