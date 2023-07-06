package app.indusara.server.dao;

import app.indusara.server.entity.Tournament;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface TournamentRepository extends JpaRepository<Tournament, Integer> {
    List<Tournament> findAllByYear(String year);
}
