package app.indusara.server.dao;

import app.indusara.server.entity.User;
import app.indusara.server.utill.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findUserByEmail(String email);
    List<User> findAllByRoleAndPayment(Role role, Boolean payment);


}
