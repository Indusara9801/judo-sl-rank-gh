package app.indusara.server.service;

import app.indusara.server.entity.Match;
import app.indusara.server.entity.Tournament;

import java.util.List;

public interface IMatchService {
    List<Match> getMatchByTournament(Tournament tournament);
}
