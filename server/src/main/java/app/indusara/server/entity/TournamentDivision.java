package app.indusara.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"tournament_id", "division_id"}))
public class TournamentDivision {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "tournament_id")
    private Tournament tournament;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "division_id")
    private Division division;

    private Boolean thirdPlaceMatch;

    @JsonIgnore
    @OneToMany(mappedBy = "tournamentDivision")
    private List<Match> matches;

    public TournamentDivision(Tournament tournament, Division division, Boolean thirdPlaceMatch) {
        this.tournament = tournament;
        this.division = division;
        this.thirdPlaceMatch = thirdPlaceMatch;
    }
}
