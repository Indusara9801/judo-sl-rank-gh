package app.indusara.server.service;

import app.indusara.server.entity.Tournament;
import app.indusara.server.helper.TournamentWithDivision;

import java.util.List;


public interface ITournamentService {
    Tournament getTournament(Integer id);

    List<Tournament> getTournamentsByYear(String year);

    void save(TournamentWithDivision tournamentWithDivision);
}
