package ro.dragosghinea.users.security;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DefaultAdmin {

    private static String defaultAdminEmail;

    public static String getDefaultAdminEmail() {
        return defaultAdminEmail;
    }

    @Value("${default_admin_email}")
    public void setDefaultAdminEmail(String email) {
        defaultAdminEmail = email;
    }

}

