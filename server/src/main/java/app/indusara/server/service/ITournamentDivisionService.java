package app.indusara.server.service;

import app.indusara.server.entity.Division;
import app.indusara.server.entity.Tournament;
import app.indusara.server.entity.TournamentDivision;

public interface ITournamentDivisionService {
    TournamentDivision findByTournamentAndDivision(Tournament tournament, Division division);

    void save(TournamentDivision tournamentDivision);
}
