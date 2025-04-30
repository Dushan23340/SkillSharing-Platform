package backend.LearningPlan.controller;

import backend.LearningPlan.model.LearningPlanModel;
import backend.LearningPlan.repository.LearningPlanRepository;
import backend.Notification.model.NotificationModel;
import backend.Notification.repository.NotificationRepository;
import backend.User.repository.UserRepository;
import backend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.scheduling.annotation.Scheduled;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin("http://localhost:3000")
public class LearningPlanController {

    @Autowired
    private LearningPlanRepository learningPlanRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    private final Path root = Paths.get("uploads/plan");

    // Create a new Learning Plan
    @PostMapping("/learningPlan")
    public LearningPlanModel createLearningPlan(@RequestBody LearningPlanModel newLearningPlanModel) {
        if (newLearningPlanModel.getPostOwnerID() == null || newLearningPlanModel.getPostOwnerID().isEmpty()) {
            throw new IllegalArgumentException("PostOwnerID is required.");
        }

        String postOwnerName = userRepository.findById(newLearningPlanModel.getPostOwnerID())
                .map(user -> user.getFullname())
                .orElseThrow(() -> new ResourceNotFoundException("User not found for ID: " + newLearningPlanModel.getPostOwnerID()));
        newLearningPlanModel.setPostOwnerName(postOwnerName);

        String currentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        newLearningPlanModel.setCreatedAt(currentDateTime);

        return learningPlanRepository.save(newLearningPlanModel);
    }

    // Upload plan image
    @PostMapping("/learningPlan/planUpload")
    public String uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
            String filename = UUID.randomUUID() + extension;
            Files.copy(file.getInputStream(), this.root.resolve(filename));
            return filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        }
    }

    // Get all learning plans
    @GetMapping("/learningPlan")
    public List<LearningPlanModel> getAllPlans() {
        List<LearningPlanModel> plans = learningPlanRepository.findAll();
        plans.forEach(plan -> {
            if (plan.getPostOwnerID() != null) {
                String name = userRepository.findById(plan.getPostOwnerID())
                        .map(user -> user.getFullname())
                        .orElse("Unknown User");
                plan.setPostOwnerName(name);
            }
        });
        return plans;
    }

    // Get a specific learning plan by ID
    @GetMapping("/learningPlan/{id}")
    public LearningPlanModel getPlanById(@PathVariable String id) {
        LearningPlanModel plan = learningPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plan not found: " + id));
        if (plan.getPostOwnerID() != null) {
            String name = userRepository.findById(plan.getPostOwnerID())
                    .map(user -> user.getFullname())
                    .orElse("Unknown User");
            plan.setPostOwnerName(name);
        }
        return plan;
    }

    // Update a learning plan
    @PutMapping("/learningPlan/{id}")
    public LearningPlanModel updatePlan(@RequestBody LearningPlanModel updatedPlan, @PathVariable String id) {
        return learningPlanRepository.findById(id)
                .map(plan -> {
                    plan.setTitle(updatedPlan.getTitle());
                    plan.setDescription(updatedPlan.getDescription());
                    plan.setContentURL(updatedPlan.getContentURL());
                    plan.setTags(updatedPlan.getTags());
                    plan.setImageUrl(updatedPlan.getImageUrl());
                    plan.setStartDate(updatedPlan.getStartDate());
                    plan.setEndDate(updatedPlan.getEndDate());
                    plan.setCategory(updatedPlan.getCategory());
                    plan.setTemplateID(updatedPlan.getTemplateID());

                    if (updatedPlan.getPostOwnerID() != null && !updatedPlan.getPostOwnerID().isEmpty()) {
                        plan.setPostOwnerID(updatedPlan.getPostOwnerID());
                        String name = userRepository.findById(updatedPlan.getPostOwnerID())
                                .map(user -> user.getFullname())
                                .orElseThrow(() -> new ResourceNotFoundException("User not found for ID: " + updatedPlan.getPostOwnerID()));
                        plan.setPostOwnerName(name);
                    }

                    return learningPlanRepository.save(plan);
                }).orElseThrow(() -> new ResourceNotFoundException("Plan not found: " + id));
    }

    // Delete a learning plan
    @DeleteMapping("/learningPlan/{id}")
    public void deletePlan(@PathVariable String id) {
        learningPlanRepository.deleteById(id);
    }

    // Serve uploaded images
    @GetMapping("/learningPlan/planImages/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            String mimeType = Files.probeContentType(file);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(mimeType != null ? mimeType : "application/octet-stream"))
                    .body(resource);
        } catch (Exception e) {
            throw new RuntimeException("Error loading image: " + e.getMessage());
        }
    }

    // Scheduled notification for expiring learning plans
    @Scheduled(cron = "0 0 0 * * ?") // Daily at midnight
    public void sendExpiryNotifications() {
        List<LearningPlanModel> plans = learningPlanRepository.findAll();
        String currentDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        plans.forEach(plan -> {
            if (plan.getEndDate() != null && plan.getPostOwnerID() != null) {
                try {
                    LocalDateTime endDate = LocalDateTime.parse(plan.getEndDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                    LocalDateTime notifyDate = endDate.minusDays(3);

                    if (notifyDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")).equals(currentDate)) {
                        boolean notificationExists = notificationRepository.findByUserId(plan.getPostOwnerID())
                                .stream()
                                .anyMatch(n -> n.getMessage().contains(plan.getTitle()));

                        if (!notificationExists) {
                            NotificationModel notification = new NotificationModel();
                            notification.setUserId(plan.getPostOwnerID());
                            notification.setMessage("Your learning plan \"" + plan.getTitle() + "\" will expire soon.");
                            notification.setCreatedAt(currentDate);
                            notification.setRead(false);
                            notificationRepository.save(notification);
                        }
                    }
                } catch (Exception e) {
                    System.err.println("Error processing plan ID " + plan.getId() + ": " + e.getMessage());
                }
            }
        });
    }
}
