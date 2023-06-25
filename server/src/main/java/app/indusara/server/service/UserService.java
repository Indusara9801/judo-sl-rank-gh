package app.indusara.server.service;

import app.indusara.server.dao.UserRepository;
import app.indusara.server.entity.User;
import app.indusara.server.utill.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{

    private final UserRepository userRepository;


    @Override
    public List<User> getPaidUsers() {
        return userRepository.findAllByRoleAndPayment(Role.USER, true);
    }

    @Override
    public List<User> getUnPaidUsers() {
        return userRepository.findAllByRoleAndPayment(Role.USER, false);
    }
}
