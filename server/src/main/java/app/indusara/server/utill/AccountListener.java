package app.indusara.server.utill;

import app.indusara.server.entity.Account;
import app.indusara.server.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class AccountListener implements ApplicationListener<OnCreateAccountEvent> {
    @Value("${client.host}")
    private String clientUrl;

    private final JavaMailSender mailSender;

    private final AccountService accountService;

    @Autowired
    public AccountListener(JavaMailSender mailSender, AccountService accountService) {
        this.mailSender = mailSender;
        this.accountService = accountService;
    }

    @Override
    public void onApplicationEvent(OnCreateAccountEvent event) {
        this.confirmCreateAccount(event);
    }

    private void confirmCreateAccount(OnCreateAccountEvent event) {
        Account account = event.getAccount();
        String token = UUID.randomUUID().toString();
        accountService.createVerificationToken(account, token);
        String recipient = account.getEmail();
        String subject = "Account confirmation";
        String message = "Verification email";
        String link = clientUrl + "/accountConfirm?token=" + token;
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipient);
        email.setSubject(subject);
        email.setText(message + "\n" + link);
        mailSender.send(email);
    }
}
