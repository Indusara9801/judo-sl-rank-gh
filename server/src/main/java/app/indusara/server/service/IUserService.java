package app.indusara.server.service;

import app.indusara.server.entity.User;
import app.indusara.server.utill.Role;

import java.util.List;

public interface IUserService {
    List<User> getPaidUsers();
    List<User> getUnPaidUsers();
}
