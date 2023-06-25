package app.indusara.server.service;


import app.indusara.server.entity.Tournament;

import java.util.Optional;

public interface ITournamentService {
    Tournament getTournament(Integer id);
}
