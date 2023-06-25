package app.indusara.server.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Player {

    @Id
    private Integer id;

    private String fullName;
    private String displayName;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate dob;
    private String gender;
    private String clubName;
    private String province;
    private String judoGrade;
    private String weightClass;

    @OneToOne(mappedBy = "player")
    @JsonIgnore
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "player_stat", referencedColumnName = "id")
    private PlayerStat playerStat;

    public Player(Integer id,String fullName, String displayName, LocalDate dob, String gender, String clubName, String province, String judoGrade, String weightClass) {
        this.id = id;
        this.fullName = fullName;
        this.displayName = displayName;
        this.dob = dob;
        this.gender = gender;
        this.clubName = clubName;
        this.province = province;
        this.judoGrade = judoGrade;
        this.weightClass = weightClass;
    }

    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", displayName='" + displayName + '\'' +
                ", dob=" + dob +
                ", gender='" + gender + '\'' +
                ", clubName='" + clubName + '\'' +
                ", province='" + province + '\'' +
                ", judoGrade='" + judoGrade + '\'' +
                ", weightClass='" + weightClass + '\'' +
                '}';
    }
}
