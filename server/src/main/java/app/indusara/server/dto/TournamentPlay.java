package app.indusara.server.dto;

import java.time.LocalDate;

public interface TournamentPlay {
    Integer getTid();

    Integer getPoints();

    LocalDate getDate();

    String getYear();

    Integer getPosition();
}
