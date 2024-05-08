package ro.dragosghinea.courses.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import ro.dragosghinea.courses.controller.errors.ErrorDto;

import java.io.IOException;

@Component("customAuthenticationEntryPoint")
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) {
        resolver.resolveException(request, response, null, exception);

        if (response.getStatus() == 200) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

            try {
                ObjectMapper objectMapper = new ObjectMapper();
                response.getWriter().write(objectMapper.writeValueAsString(
                        ErrorDto.generate(
                                exception.getMessage(),
                                request.getRequestURI(),
                                HttpStatus.UNAUTHORIZED)
                ));
                response.getWriter().flush();
                response.getWriter().close();
                response.setContentType("application/json");
            }catch(IOException ignored) {}
        }
    }

}
