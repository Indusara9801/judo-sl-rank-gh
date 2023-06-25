package app.indusara.server.dao;

import app.indusara.server.entity.PlayerStat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerStatRepository extends JpaRepository<PlayerStat, Integer> {

}
