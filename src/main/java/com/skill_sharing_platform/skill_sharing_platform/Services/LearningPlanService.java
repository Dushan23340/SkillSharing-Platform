package com.skill_sharing_platform.skill_sharing_platform.Services;

import com.skill_sharing_platform.skill_sharing_platform.Model.LearningPlan;
import com.skill_sharing_platform.skill_sharing_platform.Repository.LearningPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LearningPlanService {

    @Autowired
    private LearningPlanRepository learningPlanRepository;

    public List<LearningPlan> getLearningPlansByUser(Long userId) {
        return learningPlanRepository.findByUserId(userId);
    }

    public LearningPlan createLearningPlan(LearningPlan learningPlan) {
        return learningPlanRepository.save(learningPlan);
    }

    public Optional<LearningPlan> getLearningPlanById(Long id) {
        return learningPlanRepository.findById(id);
    }

    public LearningPlan updateLearningPlan(Long id, LearningPlan updatedPlan) {
        return learningPlanRepository.findById(id).map(plan -> {
            plan.setTitle(updatedPlan.getTitle());
            plan.setTopics(updatedPlan.getTopics());
            plan.setCompletionTimeline(updatedPlan.getCompletionTimeline());
            return learningPlanRepository.save(plan);
        }).orElseThrow(() -> new RuntimeException("Learning Plan not found"));
    }

    public void deleteLearningPlan(Long id) {
        learningPlanRepository.deleteById(id);
    }
}
