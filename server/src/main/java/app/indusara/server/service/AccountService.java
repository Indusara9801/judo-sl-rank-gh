package app.indusara.server.service;

import app.indusara.server.auth.AuthService;
import app.indusara.server.auth.RegisterRequest;
import app.indusara.server.dao.*;
import app.indusara.server.entity.Account;
import app.indusara.server.entity.Player;
import app.indusara.server.entity.PlayerStat;
import app.indusara.server.entity.VerificationToken;
import app.indusara.server.exception.CustomException;
import app.indusara.server.validator.AccountValidator;
import app.indusara.server.validator.ValidationResponse;
import app.indusara.server.validator.ValidationResult;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class AccountService implements IAccountService {
    private final AccountDAO accountDAO;
    private final VerificationTokenDAO verificationTokenDAO;
    private final AuthService authService;
    private final UserRepository userRepository;
    private PasswordEncoder encoder;


    @Override
    public Account create(Account account) {
        if (userRepository.findUserByEmail(account.getEmail()).isPresent())
            throw new IllegalStateException("User Already exist");
        ValidationResponse res = AccountValidator.isEmailValid()
                .and(AccountValidator.isPasswordValid())
                .and(AccountValidator.isDisplayNameValid())
                .and(AccountValidator.isFullNameValid())
                .and(AccountValidator.isClubNameValid())
                .and(AccountValidator.isDobValid())
                .and(AccountValidator.isGenderValid())
                .and(AccountValidator.isJudoGradeValid())
                .and(AccountValidator.isWeightClassValid())
                .and(AccountValidator.isProvinceValid())
                .apply(account);
        if (res.getTitle() != ValidationResult.SUCCESS) {
            throw new CustomException(res.getMessage(), String.valueOf(res.getTitle()));
        }
        account.setPassword(encoder.encode(account.getPassword()));
        return accountDAO.save(account);
    }

    @Override
    public void createVerificationToken(Account account, String token) {
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setEmail(account.getEmail());
        verificationToken.setExpiryDate(verificationToken.calculateExpiryDate(VerificationToken.EXPIRATION));
        verificationTokenDAO.save(verificationToken);
    }

    @Override
    public String confirmAccount(String token) {
        VerificationToken verificationToken = verificationTokenDAO.findByToken(token);
        if (verificationToken.getExpiryDate().after(new Date())) {
            Account account = accountDAO.findByEmail(verificationToken.getEmail());
            System.out.println(account);
            Player player = new Player(account.getId(), account.getFullName(), account.getDisplayName(), account.getDob(), account.getGender(), account.getClubName(), account.getProvince(), account.getJudoGrade(), account.getWeightClass());
            player.setPlayerStat(new PlayerStat(account.getId(), 0, 0, 0));
            String authenticationResponse = authService.register(new RegisterRequest(account.getEmail(), account.getPassword()), player);
            accountDAO.delete(account);
            verificationTokenDAO.delete(verificationToken);
            return authenticationResponse;
        }
        return null;
    }
}
