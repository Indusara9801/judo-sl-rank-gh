package app.indusara.server.dao;

import app.indusara.server.entity.Division;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DivisionRepository extends JpaRepository<Division, Integer> {
    Division getDivisionByGenderAndWeightClass(String gender, Integer weightClass);
}
