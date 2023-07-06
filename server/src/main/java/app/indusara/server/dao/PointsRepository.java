package app.indusara.server.dao;

import app.indusara.server.entity.Points;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.*;

public interface PointsRepository extends JpaRepository<Points, Integer> {
}
