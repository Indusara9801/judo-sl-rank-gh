package app.indusara.server.service;

import app.indusara.server.entity.Division;

import java.util.List;

public interface IDivisionService {
    Division getDivisionById(Integer id);

    Division getDivisionByGenderAndWeightClass(String gender, Integer weightClass);

    List<Division> getAllDivisions();
}
