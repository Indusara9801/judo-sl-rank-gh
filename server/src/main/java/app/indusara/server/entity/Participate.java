package app.indusara.server.entity;

import app.indusara.server.dto.PlayerTournamentDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedNativeQuery(
        name = "get_player_tournaments",
        query = "SELECT " +
                "`judo-ranking`.tournament.id AS tournamentId, " +
                "`judo-ranking`.points.tournament AS tournament, " +
                "`judo-ranking`.tournament.date AS date, " +
                "`judo-ranking`.tournament.year AS year, " +
                "`judo-ranking`.participate.position AS position " +
                "FROM `judo-ranking`.tournament " +
                "JOIN `judo-ranking`.points " +
                "ON `judo-ranking`.tournament.id = `judo-ranking`.points.id " +
                "JOIN `judo-ranking`.participate " +
                "ON `judo-ranking`.tournament.id = `judo-ranking`.participate.tournament_id " +
                "WHERE `judo-ranking`.tournament.year = :year " +
                "AND `judo-ranking`.participate.player_id = :playerId",
        resultSetMapping = "player_tournament_dto"
)
@SqlResultSetMapping(
        name = "player_tournament_dto",
        classes = @ConstructorResult(
                targetClass = PlayerTournamentDto.class,
                columns =  {
                      @ColumnResult(name = "tournamentId", type = Integer.class),
                      @ColumnResult(name = "tournament", type = String.class),
                      @ColumnResult(name = "date", type = LocalDate.class),
                      @ColumnResult(name = "year", type = String.class),
                      @ColumnResult(name = "position", type = Integer.class),
                }
        )
)
public class Participate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer position;

    @ManyToOne
    @JoinColumn(name = "player_id")
    private Player player;

    @ManyToOne
    @JoinColumn(name = "tournament_id")
    private Tournament tournament;
}
