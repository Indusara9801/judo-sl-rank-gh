package app.indusara.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tournament {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate date;

    private String year;

    @ManyToOne
    @JoinColumn(name = "point_id")
    private Points points;

    @OneToMany(mappedBy = "tournament")
    private List<Match> matches;


}
