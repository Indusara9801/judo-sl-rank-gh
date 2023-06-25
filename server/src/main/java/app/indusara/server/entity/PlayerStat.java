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
    private Integer id;

    private Integer wins;

    private Integer losses;

    private Integer points;

    @OneToOne(mappedBy = "playerStat")
    @JsonIgnore
    private Player player;

    public PlayerStat(Integer id,Integer wins, Integer losses, Integer points) {
        this.id = id;
        this.wins = wins;
        this.losses = losses;
        this.points = points;
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
