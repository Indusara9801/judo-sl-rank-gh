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
public class Points {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String tournament;
    private Integer first;
    private Integer second;
    private Integer third;
    private Integer fourth;
    private Integer fifth;
    private Integer sixth;
    private Integer seventh;
    private Integer eighth;
    private Integer ninth;
    private Integer tenth;
    private Integer participation;

    @OneToMany(mappedBy = "points")
    @JsonIgnore
    private List<Tournament> tournaments;
}
