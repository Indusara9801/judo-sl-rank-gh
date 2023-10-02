package app.indusara.server.service;

import app.indusara.server.entity.Player;

import java.util.Optional;

public interface IPlayerService {
    Player getPlayer(Integer id);

    Player getPlayerByEmail(String email);


}
