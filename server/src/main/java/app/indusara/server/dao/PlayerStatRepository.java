package app.indusara.server.dao;

import app.indusara.server.entity.Division;
import app.indusara.server.entity.PlayerStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface PlayerStatRepository extends JpaRepository<PlayerStat, Integer> {
    List<PlayerStat> findAllByDivision(Division division);
}
