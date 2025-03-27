package com.skill_sharing_platform.skill_sharing_platform.Services;

import com.skill_sharing_platform.skill_sharing_platform.Model.User;
import com.skill_sharing_platform.skill_sharing_platform.Model.Notification;
import com.skill_sharing_platform.skill_sharing_platform.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByUserIdAndIsReadFalse(userId);
    }

    public Notification createNotification(Long userId, String message) {
        Notification notification = new Notification();
        notification.setUser(new User(userId));
        notification.setMessage(message);
        notification.setRead(false);
        notification.setTimestamp(LocalDateTime.now());
        return notificationRepository.save(notification);
    }

    public Notification markAsRead(Long id) {
        return notificationRepository.findById(id).map(notification -> {
            notification.setRead(true);
            return notificationRepository.save(notification);
        }).orElseThrow(() -> new RuntimeException("Notification not found"));
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}
