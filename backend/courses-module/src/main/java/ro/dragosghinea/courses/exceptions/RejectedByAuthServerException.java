package ro.dragosghinea.courses.exceptions;

import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = org.springframework.http.HttpStatus.UNAUTHORIZED, reason = "Rejected by auth server")
public class RejectedByAuthServerException extends AuthenticationException {
    public RejectedByAuthServerException(String msg) {
        super(msg);
    }
}
