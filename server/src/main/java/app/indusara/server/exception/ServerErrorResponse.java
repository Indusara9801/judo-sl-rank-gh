package app.indusara.server.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ServerErrorResponse {
    private String title;
    private String message;
    private Integer status;
    private long timeStamp;
}
