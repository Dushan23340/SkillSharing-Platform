package com.skill_sharing_platform.skill_sharing_platform.Controller;

import com.skill_sharing_platform.skill_sharing_platform.Exception.UserNotFoundException;
import com.skill_sharing_platform.skill_sharing_platform.Model.User;
import com.skill_sharing_platform.skill_sharing_platform.Repository.UserRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173") // Allow frontend to access backend
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Insert new user
    @PostMapping("/user")
    public ResponseEntity<?> newUser(@RequestBody User newUser) {
        Optional<User> existingUser = userRepository.findByEmail(newUser.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email already exists!"));
        }
        User savedUser = userRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }

    // User Login
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User loginDetails) {
        User user = userRepository.findByEmail(loginDetails.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Email not found: " + loginDetails.getEmail()));

        // Check if password is correct
        if (Objects.equals(user.getPassword(), loginDetails.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login Successful");
            response.put("id", user.getId()); // Return user ID
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid Credentials!"));
        }
    }

    // Display All Users
    @GetMapping("/user")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get User by ID
    @GetMapping("/user/{id}")
    public User getUserId(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));
    }

    // Update user profile
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));

        existingUser.setusername(updatedUser.getusername());
        existingUser.setBio(updatedUser.getBio());
        existingUser.setProfilePicture(updatedUser.getProfilePicture());
        existingUser.setCoverImage(updatedUser.getCoverImage());

        User updated = userRepository.save(existingUser);
        return ResponseEntity.ok(updated);
    }

    // Follow/Unfollow User
    @PostMapping("/user/follow/{id}")
    public ResponseEntity<Map<String, String>> followUser(@PathVariable Long id, @RequestBody Boolean follow) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));

        // Implement following logic here (toggle follow/unfollow)
        user.setFollowing(follow);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", follow ? "User followed!" : "User unfollowed!"));
    }
}