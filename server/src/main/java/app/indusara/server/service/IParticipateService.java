package app.indusara.server.service;

import app.indusara.server.dto.ParticipantDto;
import app.indusara.server.dto.TournamentConfig;
import app.indusara.server.entity.Division;
import app.indusara.server.entity.Participate;
import app.indusara.server.validator.Gender;

import java.util.List;
import java.util.Map;

public interface IParticipateService {
    void save(Participate participate);

    void addAll(Integer tournamentId, Gender division, Integer weightClass);

    Map<Integer, List<ParticipantDto>> getParticipate(Integer tournamentId, Gender division, Integer weightClass);
}
