package app.indusara.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer playerId;
    private Boolean won;
    private Integer ippon;
    private Integer penalty;
    private Integer wasaAri;
    private Boolean playerInDb;
    private String color;
}
