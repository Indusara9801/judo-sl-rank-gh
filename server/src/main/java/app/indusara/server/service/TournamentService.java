package app.indusara.server.service;

import app.indusara.server.dao.TournamentRepository;
import app.indusara.server.entity.Division;
import app.indusara.server.entity.Tournament;
import app.indusara.server.entity.TournamentDivision;
import app.indusara.server.helper.TournamentWithDivision;
import app.indusara.server.validator.Gender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TournamentService implements ITournamentService {

    private final TournamentRepository tournamentRepository;
    private final ITournamentDivisionService tournamentDivisionService;
    private final IDivisionService divisionService;

    @Override
    public Tournament getTournament(Integer id) {
        return tournamentRepository.findById(id).orElse(null);

    }

    @Override
    public List<Tournament> getTournamentsByYear(String year) {
        return tournamentRepository.findAllByYear(year);
    }

    @Override
    public void save(TournamentWithDivision tournamentWithDivision) {
        Tournament savedTournament = tournamentRepository.save(tournamentWithDivision.getTournament());
        tournamentWithDivision.getThirdPlaceMatchesMale().forEach((k, v) -> {
            Division division = divisionService.getDivisionByGenderAndWeightClass(Gender.male.name(), k);
            System.out.println(new TournamentDivision(savedTournament, division, v));
            tournamentDivisionService.save(new TournamentDivision(savedTournament, division, v));
        });

        tournamentWithDivision.getThirdPlaceMatchesFemale().forEach((k, v) -> {
            Division division = divisionService.getDivisionByGenderAndWeightClass(Gender.female.name(), k);
            System.out.println(new TournamentDivision(savedTournament, division, v));
            tournamentDivisionService.save(new TournamentDivision(savedTournament, division, v));
        });

    }
}
