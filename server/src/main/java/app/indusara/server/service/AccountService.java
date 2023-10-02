package app.indusara.server.service;

import app.indusara.server.auth.AuthService;
import app.indusara.server.auth.RegisterRequest;
import app.indusara.server.dao.AccountDAO;
import app.indusara.server.dao.PlayerRepository;
import app.indusara.server.dao.UserRepository;
import app.indusara.server.dao.VerificationTokenDAO;
import app.indusara.server.entity.*;
import app.indusara.server.exception.CustomException;
import app.indusara.server.validator.AccountValidator;
import app.indusara.server.validator.ValidationResponse;
import app.indusara.server.validator.ValidationResult;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class AccountService implements IAccountService {
    private final AccountDAO accountDAO;
    private final VerificationTokenDAO verificationTokenDAO;
    private final AuthService authService;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final PlayerRepository playerRepository;
    private final IDivisionService divisionService;


    @Override
    public Account create(Account account) {
        if (userRepository.findUserByEmail(account.getEmail()).isPresent())
            throw new CustomException("A User already exist for this email", ValidationResult.DUPLICATE_EMAIL.name());
        ValidationResponse res = AccountValidator.isEmailValid().and(AccountValidator.isPasswordValid()).and(AccountValidator.isDisplayNameValid()).and(AccountValidator.isFullNameValid()).and(AccountValidator.isClubNameValid()).and(AccountValidator.isDobValid()).and(AccountValidator.isGenderValid()).and(AccountValidator.isJudoGradeValid()).and(AccountValidator.isWeightClassValid()).and(AccountValidator.isProvinceValid()).apply(account);
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
        System.out.println("Verification = " + verificationToken);
        if (verificationToken.getExpiryDate().after(new Date())) {
            Account account = accountDAO.findByEmail(verificationToken.getEmail());
            System.out.println(account);
            Player currentPlayer = new Player(account.getId(), account.getFullName(), account.getDisplayName(), account.getDob(), account.getClubName(), account.getProvince(), account.getJudoGrade());
            Division division = divisionService.getDivisionByGenderAndWeightClass(account.getGender(), account.getWeightClass());
            PlayerStat playerStat = new PlayerStat(0, 0, 0, division);
            playerStat.setPlayer(currentPlayer);
            currentPlayer.setPlayerStat(new ArrayList<>(List.of(playerStat)));
            Player player = playerRepository.save(currentPlayer);
            String authenticationResponse = authService.register(new RegisterRequest(account.getEmail(), account.getPassword()), player);
            accountDAO.delete(account);
            verificationTokenDAO.delete(verificationToken);
            return authenticationResponse;
        }
        return null;
    }
}
