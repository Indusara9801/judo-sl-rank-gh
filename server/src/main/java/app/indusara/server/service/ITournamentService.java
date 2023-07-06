package app.indusara.server.service;


import app.indusara.server.dto.FullTournament;
import app.indusara.server.entity.Tournament;

import java.util.List;
import java.util.Optional;

public interface ITournamentService {
    FullTournament getTournament(Integer id);

    List<Tournament> getTournamentsByYear(String year);
}
