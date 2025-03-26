package com.skill_sharing_platform.skill_sharing_platform.Repository;


import com.skill_sharing_platform.skill_sharing_platform.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserId(Long userId);
}
