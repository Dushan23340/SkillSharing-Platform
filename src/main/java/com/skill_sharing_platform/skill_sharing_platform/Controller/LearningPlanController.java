package com.skill_sharing_platform.skill_sharing_platform.Controller;


import com.skill_sharing_platform.skill_sharing_platform.Model.LearningPlan;
import com.skill_sharing_platform.skill_sharing_platform.Services.LearningPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/learning-plans")
public class LearningPlanController {

    @Autowired
    private LearningPlanService learningPlanService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<LearningPlan>> getLearningPlansByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(learningPlanService.getLearningPlansByUser(userId));
    }

    @PostMapping
    public ResponseEntity<LearningPlan> createLearningPlan(@RequestBody LearningPlan learningPlan) {
        return ResponseEntity.ok(learningPlanService.createLearningPlan(learningPlan));
    }

    @GetMapping("/plan/{id}")
    public ResponseEntity<Optional<LearningPlan>> getLearningPlanById(@PathVariable Long id) {
        return ResponseEntity.ok(learningPlanService.getLearningPlanById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningPlan> updateLearningPlan(@PathVariable Long id, @RequestBody LearningPlan updatedPlan) {
        return ResponseEntity.ok(learningPlanService.updateLearningPlan(id, updatedPlan));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLearningPlan(@PathVariable Long id) {
        learningPlanService.deleteLearningPlan(id);
        return ResponseEntity.noContent().build();
    }
}
