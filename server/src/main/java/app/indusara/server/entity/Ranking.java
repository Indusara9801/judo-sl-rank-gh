package app.indusara.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ranking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "player_id")
    private Player player;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "division_id")
    private Division division;

    private Integer position;

    private Integer prevPosition;

    public Ranking(Player player, Division division, Integer position, Integer prevPosition) {
        this.player = player;
        this.division = division;
        this.position = position;
        this.prevPosition = prevPosition;
    }
}
