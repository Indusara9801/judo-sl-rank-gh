package app.indusara.server.rest;

import app.indusara.server.dto.BracketEntry;
import app.indusara.server.dto.MatchDto;
import app.indusara.server.dto.PlayerWrapper;
import app.indusara.server.service.IMatchService;
import app.indusara.server.validator.Gender;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MatchController {

    private final IMatchService matchService;

    @PostMapping("/match")
    public void saveMatch(@RequestBody MatchDto match) {
        matchService.saveMatch(match);
    }

    @GetMapping("/bracket/{id}")
    public Map<String, Map<Integer, Map<Integer, List<BracketEntry>>>> getBracket(@PathVariable Integer id) {
        return matchService.createBracket(id);
    }

    @GetMapping("/position/{id}/{division}/{weightClass}")
    public Map<Integer, List<PlayerWrapper>> getPositions(@PathVariable Integer id, @PathVariable String division, @PathVariable Integer weightClass) {
        return matchService.getPositions(id, Gender.valueOf(division), weightClass);
    }
}
