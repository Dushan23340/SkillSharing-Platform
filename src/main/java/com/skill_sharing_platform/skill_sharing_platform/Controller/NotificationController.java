package com.skill_sharing_platform.skill_sharing_platform.Controller;

import com.skill_sharing_platform.skill_sharing_platform.Model.Notification;
import com.skill_sharing_platform.skill_sharing_platform.Services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> getUnreadNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.getUnreadNotifications(userId));
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Notification> createNotification(@PathVariable Long userId, @RequestBody String message) {
        return ResponseEntity.ok(notificationService.createNotification(userId, message));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notification> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }
}

