package ro.dragosghinea.courses.controller.errors;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ro.dragosghinea.courses.exceptions.InvalidJWT;
import ro.dragosghinea.courses.exceptions.RejectedByAuthServerException;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(InvalidJWT.class)
    public ResponseEntity<ErrorDto> handleInvalidJWT(
            HttpServletRequest request, InvalidJWT e)
    {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                ErrorDto.generate(
                        e.getMessage(),
                        request.getRequestURI(),
                        HttpStatus.UNAUTHORIZED)
        );
    }

    @ExceptionHandler(RejectedByAuthServerException.class)
    public ResponseEntity<ErrorDto> handleRejectedByAuthServerException(
            HttpServletRequest request, RejectedByAuthServerException e)
    {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                ErrorDto.generate(
                        e.getMessage(),
                        request.getRequestURI(),
                        HttpStatus.UNAUTHORIZED)
        );
    }
}
