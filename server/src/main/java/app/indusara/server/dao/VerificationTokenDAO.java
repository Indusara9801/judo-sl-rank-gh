package app.indusara.server.dao;

import app.indusara.server.entity.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenDAO extends JpaRepository<VerificationToken, Integer> {
    VerificationToken findByToken(String token);

    void deleteByEmail(String email);
}
