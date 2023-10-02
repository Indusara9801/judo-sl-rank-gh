package app.indusara.server.dao;

import app.indusara.server.entity.Points;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.*;


public interface PointsRepository extends JpaRepository<Points, Integer> {
}
