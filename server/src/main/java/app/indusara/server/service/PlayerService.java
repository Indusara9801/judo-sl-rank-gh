package app.indusara.server.service;

import app.indusara.server.dao.PlayerRepository;
import app.indusara.server.entity.Player;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlayerService implements IPlayerService{

    private final PlayerRepository playerRepository;
    @Override
    public Player getPlayer(Integer id) {
        Player player = null;
        Optional<Player> playerOptional = playerRepository.findById(id);
        if(playerOptional.isPresent()) {
            player = playerOptional.get();
        }
        return player;
    }
}
