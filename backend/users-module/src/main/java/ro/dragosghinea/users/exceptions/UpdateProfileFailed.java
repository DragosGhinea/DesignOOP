package ro.dragosghinea.users.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class UpdateProfileFailed extends RuntimeException {

    public UpdateProfileFailed(String message) {
        super(message);
    }

    public UpdateProfileFailed() {
        super("Update profile failed!");
    }
}
