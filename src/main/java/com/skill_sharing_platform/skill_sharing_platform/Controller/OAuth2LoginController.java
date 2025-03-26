package com.skill_sharing_platform.skill_sharing_platform.Controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class OAuth2LoginController {
    @GetMapping("/oauth/user")
    public Map<String, Object> getUserDetails(@AuthenticationPrincipal OAuth2User user) {
        return user.getAttributes();
    }
}
