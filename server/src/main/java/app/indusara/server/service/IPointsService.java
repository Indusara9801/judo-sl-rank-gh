package app.indusara.server.service;

import app.indusara.server.entity.Points;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPointsService {
    Points getPoints(int id);
}
