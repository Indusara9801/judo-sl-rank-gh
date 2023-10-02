package app.indusara.server.rest;

import app.indusara.server.entity.Player;
import app.indusara.server.service.IPlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PlayerController {
    private final IPlayerService playerService;

    @GetMapping("/player/{id}")
    public ResponseEntity<Player> getPlayer(@PathVariable Integer id) {
        return ResponseEntity.ok(playerService.getPlayer(id));
    }

    @GetMapping("/playerByEmail/{email}")
    public Player getPlayerByEmail(@PathVariable String email) {
        return playerService.getPlayerByEmail(email);
    }
}
