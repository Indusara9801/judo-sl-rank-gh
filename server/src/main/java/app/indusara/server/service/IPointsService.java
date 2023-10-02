package app.indusara.server.service;

import app.indusara.server.entity.Points;

import java.util.List;

public interface IPointsService {
    Points getPointsById(int id);

    List<Points> getPoints();
}
