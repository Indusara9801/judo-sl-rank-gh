package app.indusara.server.auth;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FailedAuthenticationResponse extends AuthenticationResponse {
    private String type;
}
