package app.indusara.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


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

    @Transient
    public Map<Integer, Integer> getPositionPointMap() {
        return new HashMap<>(Map.ofEntries(
                Map.entry(1, first),
                Map.entry(2, second),
                Map.entry(3, third),
                Map.entry(4, fourth),
                Map.entry(5, fifth),
                Map.entry(6, sixth),
                Map.entry(7, seventh),
                Map.entry(8, eighth),
                Map.entry(9, ninth),
                Map.entry(10, tenth),
                Map.entry(11, participation)
        ));
    }


}
