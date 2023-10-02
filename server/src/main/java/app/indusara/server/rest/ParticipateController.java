package app.indusara.server.rest;

import app.indusara.server.dto.ParticipantDto;
import app.indusara.server.dto.TournamentConfig;
import app.indusara.server.service.IParticipateService;
import app.indusara.server.validator.Gender;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ParticipateController {

    private final IParticipateService participateService;

    @PostMapping("/participate/{id}/{division}/{weightClass}")
    public void addAll(@PathVariable Integer id, @PathVariable String division, @PathVariable Integer weightClass) {
        participateService.addAll(id, Gender.valueOf(division), weightClass);
    }

    @GetMapping("/participate/{id}/{division}/{weightClass}")
    public Map<Integer, List<ParticipantDto>> getAllParticipantsByTournamentAndDivisionAndWeightClass(@PathVariable Integer id, @PathVariable String division, @PathVariable Integer weightClass) {
        return participateService.getParticipate(id, Gender.valueOf(division), weightClass);
    }

}
