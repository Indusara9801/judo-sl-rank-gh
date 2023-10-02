package app.indusara.server.rest;

import app.indusara.server.dto.RankingDto;
import app.indusara.server.entity.Ranking;
import app.indusara.server.service.IRankingService;
import app.indusara.server.validator.Gender;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RankingController {
    private final IRankingService rankingService;

    @PostMapping("/rank/{gender}/{weightClass}")
    public void rankDivision(@PathVariable String gender, @PathVariable Integer weightClass) {
        rankingService.rankByGenderAndWeightClass(Gender.valueOf(gender), weightClass);
    }

    @PostMapping("/rank")
    public void rankAll() {
        rankingService.rankAll();
    }

    @GetMapping("/rank")
    public Map<String, Map<Integer, Map<Integer, List<RankingDto>>>> getAll() {
        return rankingService.getAll();
    }
}
