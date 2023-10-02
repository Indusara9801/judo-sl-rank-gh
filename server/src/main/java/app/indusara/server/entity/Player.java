package app.indusara.server.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String fullName;

    private String displayName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dob;

    private String clubName;

    private String province;

    private String judoGrade;

    @OneToOne(mappedBy = "player")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL)
    private List<PlayerStat> playerStat;

    public Player(Integer id, String fullName, String displayName, LocalDate dob, String clubName, String province, String judoGrade) {
        this.id = id;
        this.fullName = fullName;
        this.displayName = displayName;
        this.dob = dob;
        this.clubName = clubName;
        this.province = province;
        this.judoGrade = judoGrade;
    }

    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", displayName='" + displayName + '\'' +
                ", dob=" + dob +
                ", clubName='" + clubName + '\'' +
                ", province='" + province + '\'' +
                ", judoGrade='" + judoGrade + '\'' +
                '}';
    }
}
