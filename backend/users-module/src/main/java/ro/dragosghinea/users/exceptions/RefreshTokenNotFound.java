package ro.dragosghinea.users.exceptions;

public class RefreshTokenNotFound extends RuntimeException{

    public RefreshTokenNotFound(String message) {
        super(message);
    }

    public RefreshTokenNotFound() {
        super("Refresh token not found!");
    }
}
