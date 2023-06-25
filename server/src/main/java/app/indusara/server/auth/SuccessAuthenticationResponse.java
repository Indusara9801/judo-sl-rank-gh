package app.indusara.server.auth;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SuccessAuthenticationResponse extends AuthenticationResponse {
    private String status;
    private String accessToken;
    private String refreshToken;
}
