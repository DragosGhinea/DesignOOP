package ro.dragosghinea.courses.exceptions;

import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = org.springframework.http.HttpStatus.UNAUTHORIZED)
public class InvalidJWT extends AuthenticationException {
    public InvalidJWT(String msg) {
        super(msg);
    }
}
