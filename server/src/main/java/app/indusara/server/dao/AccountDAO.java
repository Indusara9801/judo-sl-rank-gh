package app.indusara.server.dao;

import app.indusara.server.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface AccountDAO extends JpaRepository<Account, Integer> {
    Account findByEmail(String email);
}
