package app.indusara.server.validator;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ValidationResponse {
    private ValidationResult title;
    private String message;
}
