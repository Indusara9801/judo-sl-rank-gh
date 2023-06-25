package app.indusara.server.service;

import app.indusara.server.auth.AuthenticationResponse;
import app.indusara.server.entity.Account;

public interface IAccountService {
    Account create(Account account);

    void createVerificationToken(Account account, String token);

    String confirmAccount(String token);
}
