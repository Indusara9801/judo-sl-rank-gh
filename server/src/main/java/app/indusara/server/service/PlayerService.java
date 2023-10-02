package app.indusara.server.service;

import app.indusara.server.dao.PlayerRepository;
import app.indusara.server.dao.UserRepository;
import app.indusara.server.entity.Player;
import app.indusara.server.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlayerService implements IPlayerService {

    private final PlayerRepository playerRepository;
    private final UserRepository userRepository;

    @Override
    public Player getPlayer(Integer id) {
        return playerRepository.findById(id).orElse(null);
    }

    @Override
    public Player getPlayerByEmail(String email) {
        User user = userRepository.findUserByEmail(email).orElse(null);
        return user != null ? user.getPlayer() : null;
    }


}
