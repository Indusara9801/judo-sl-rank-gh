package app.indusara.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private Integer weightClass;

    private String division;

    @ManyToOne
    @JoinColumn(name = "t_id")
    @JsonIgnore
    private Tournament tournament;

    @OneToOne
    @JoinColumn(name = "player1")
    private MatchDetail matchPlayer1;

    @OneToOne
    @JoinColumn(name = "player2")
    private MatchDetail matchPlayer2;
}
