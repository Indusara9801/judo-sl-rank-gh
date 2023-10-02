package app.indusara.server.cron;

import app.indusara.server.service.IRankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RankAll {

    private final IRankingService rankingService;

    @Scheduled(cron = "0 58 1 * * ?")
    public void rankAllDivisions() {
        System.out.println("Ranking all divisions");
        rankingService.rankAll();
    }
}
