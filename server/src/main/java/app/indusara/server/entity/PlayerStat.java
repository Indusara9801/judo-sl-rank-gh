package app.indusara.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "player_stat")
public class PlayerStat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer wins;

    private Integer losses;

    private Integer points;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "division_id")
    private Division division;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private Player player;



    public PlayerStat(Integer wins, Integer losses, Integer points, Division division) {
        this.wins = wins;
        this.losses = losses;
        this.points = points;
        this.division = division;
    }

    @Override
    public String toString() {
        return "PlayerStat{" +
                "id=" + id +
                ", wins=" + wins +
                ", losses=" + losses +
                ", points=" + points +
                '}';
    }
}
