package app.indusara.server.rest;

import app.indusara.server.entity.Points;
import app.indusara.server.service.IPointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PointsController {
    private final IPointsService pointsService;

    @GetMapping("/points/{id}")
    public Points getPointsById(@PathVariable() Integer id) {
        return pointsService.getPointsById(id);
    }

    @GetMapping("/points")
    public List<Points> getPoints() {
        return pointsService.getPoints();
    }
}
