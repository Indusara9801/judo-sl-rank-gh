package app.indusara.server.cron;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TestCron {

    @Scheduled(cron = "0 25 1 * * ?")
    public void runTask () {
        System.out.println("CRON RUNNING");
    }
}
