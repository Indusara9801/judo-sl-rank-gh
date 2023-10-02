package app.indusara.server.dao;

import app.indusara.server.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface PlayerRepository extends JpaRepository<Player, Integer> {

}
