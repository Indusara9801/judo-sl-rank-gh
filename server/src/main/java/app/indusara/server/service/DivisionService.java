package app.indusara.server.service;

import app.indusara.server.dao.DivisionRepository;
import app.indusara.server.entity.Division;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DivisionService implements IDivisionService{

    private final DivisionRepository divisionRepository;

    @Override
    public Division getDivisionById(Integer id) {
        return divisionRepository.findById(id).orElse(null);
    }

    @Override
    public Division getDivisionByGenderAndWeightClass(String gender, Integer weightClass) {
        return divisionRepository.getDivisionByGenderAndWeightClass(gender, weightClass);
    }

    @Override
    public List<Division> getAllDivisions() {
        return divisionRepository.findAll();
    }
}
