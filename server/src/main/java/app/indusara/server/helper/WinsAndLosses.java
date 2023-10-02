package app.indusara.server.helper;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@JsonSerialize
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WinsAndLosses {
    private Integer currentWins;
    private Integer currentLosses;
}
