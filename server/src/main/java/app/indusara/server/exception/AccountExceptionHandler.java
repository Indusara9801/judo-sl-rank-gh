package app.indusara.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AccountExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<ServerErrorResponse> handleException(CustomException exception) {
        ServerErrorResponse errorResponse = new ServerErrorResponse(exception.getTitle(), exception.getLocalizedMessage(), HttpStatus.BAD_REQUEST.value(), System.currentTimeMillis());
        return ResponseEntity.badRequest().body(errorResponse);
    }
}
