package app.indusara.server.service;

import app.indusara.server.dto.RankingDto;
import app.indusara.server.validator.Gender;

import java.util.List;
import java.util.Map;

public interface IRankingService {
    void rankByGenderAndWeightClass(Gender gender, Integer weightClass);

    void rankAll();

    Map<String, Map<Integer, Map<Integer, List<RankingDto>>>> getAll();
}
