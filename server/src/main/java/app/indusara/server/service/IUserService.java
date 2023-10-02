package app.indusara.server.service;

import app.indusara.server.entity.Player;
import app.indusara.server.entity.User;
import app.indusara.server.utill.Role;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IUserService {
    List<User> getPaidUsers();
    List<User> getUnPaidUsers();
}
