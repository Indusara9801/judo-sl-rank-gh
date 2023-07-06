package app.indusara.server.rest;

import app.indusara.server.auth.AuthenticationResponse;
import app.indusara.server.entity.Account;
import app.indusara.server.service.IAccountService;
import app.indusara.server.utill.OnCreateAccountEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AccountController {
    private IAccountService accountService;
    private PasswordEncoder encoder;

    private final ApplicationEventPublisher eventPublisher;


    @Autowired
    public AccountController(IAccountService accountService, PasswordEncoder encoder, ApplicationEventPublisher eventPublisher) {
        this.accountService = accountService;
        this.encoder = encoder;
        this.eventPublisher = eventPublisher;
    }

    @PostMapping("/account")
    public void registration(@RequestBody() Account account) {
        System.out.println(account);

        account = accountService.create(account);
        eventPublisher.publishEvent(new OnCreateAccountEvent(account));
    }

    @GetMapping("/accountConfirm/{token}")
    public ResponseEntity<String> confirmAccount(@PathVariable String token) {

        return ResponseEntity.ok(accountService.confirmAccount(token));
    }
}
