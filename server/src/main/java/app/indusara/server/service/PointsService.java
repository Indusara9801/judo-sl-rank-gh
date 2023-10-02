package app.indusara.server.service;

import app.indusara.server.dao.PointsRepository;
import app.indusara.server.entity.Points;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PointsService implements IPointsService {

    private final PointsRepository pointsRepository;

    @Override
    public Points getPointsById(int id) {
        return pointsRepository.findById(id).orElse(null);
    }

    @Override
    public List<Points> getPoints() {
        return pointsRepository.findAll();
    }
}
