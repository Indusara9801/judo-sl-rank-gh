package app.indusara.server.exception;


public class CustomException extends IllegalStateException {
    private String title;

    public CustomException(String s, String title) {
        super(s);
        this.title = title;
    }

    public CustomException(String message, Throwable cause) {
        super(message, cause);
    }

    public CustomException(Throwable cause) {
        super(cause);
    }

    public String getTitle() {
        return title;
    }
}
