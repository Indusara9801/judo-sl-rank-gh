package app.indusara.server.dao;

import app.indusara.server.entity.Division;
import app.indusara.server.entity.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RankingRepository extends JpaRepository<Ranking, Integer> {
    List<Ranking> findAllByDivision(Division division);
}
