package app.indusara.server.auth;

import app.indusara.server.dao.*;
import app.indusara.server.entity.Player;
import app.indusara.server.entity.User;
import app.indusara.server.exception.CustomException;
import app.indusara.server.utill.Role;
import app.indusara.server.validator.ValidationResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;


    public String register(RegisterRequest request, Player player) {
        var user = User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .payment(false)
                .player(player)
                .role(Role.USER)
                .build();
        repository.save(user);
        return "Account Verified";
    }

    public ResponseEntity<AuthenticationResponse> authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var isUser = repository.findUserByEmail(request.getEmail());
        if (isUser.isEmpty()) {
            throw new CustomException("User not found", "USER_NOT_FOUND");
        }
        User user = isUser.get();
        if (!user.getPayment()) {
            throw new CustomException("Please make the payment to get access", ValidationResult.NO_PAYMENT.name());
        }
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        return ResponseEntity.ok(
                SuccessAuthenticationResponse.
                        builder()
                        .accessToken(jwtToken)
                        .refreshToken(refreshToken)
                        .status(user.getAuthorities().toString())
                        .build()
        );
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            var authResponse = FailedAuthenticationResponse
                    .builder()
                    .type("Refresh token invalid")
                    .build();
            new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            return;
        }
        // 7 since 'Bearer ' has 7 characters
        final String refreshToken = authHeader.substring(7);
        System.out.println(refreshToken);
        final String userEmail = jwtService.extractUsername(refreshToken);
        System.out.println(userEmail);
        if (userEmail == null) {
            var authResponse = FailedAuthenticationResponse
                    .builder()
                    .type("No Username")
                    .build();
            new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            return;
        }
        var userDetails = this.repository.findUserByEmail(userEmail)
                .orElseThrow();
        if (jwtService.isTokenExpired(refreshToken)) {
            var authResponse = FailedAuthenticationResponse
                    .builder()
                    .type("Access token expired")
                    .build();
            new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            return;
        }
        if (!jwtService.isTokenValid(refreshToken, userDetails)) {
            var authResponse = FailedAuthenticationResponse
                    .builder()
                    .type("Username mismatch")
                    .build();
            new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            return;
        }
        var accessToken = jwtService.generateToken(userDetails);
        System.out.println(accessToken);
        var authResponse = SuccessAuthenticationResponse
                .builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .status(userDetails.getAuthorities().toString())
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
    }
}
