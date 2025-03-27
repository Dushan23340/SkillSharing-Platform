package com.skill_sharing_platform.skill_sharing_platform.Services;

import com.skill_sharing_platform.skill_sharing_platform.Model.Post;
import com.skill_sharing_platform.skill_sharing_platform.Model.User;
import com.skill_sharing_platform.skill_sharing_platform.Repository.PostRepository;
import com.skill_sharing_platform.skill_sharing_platform.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public Post createPost(Long userId, Post post) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            post.setUser(user.get());
            return postRepository.save(post);
        }
        throw new RuntimeException("User not found");
    }

    public Post updatePost(Long postId, Post newPostData) {
        return postRepository.findById(postId).map(post -> {
            post.setDescription(newPostData.getDescription());
            return postRepository.save(post);
        }).orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

    public String uploadMedia(MultipartFile file) throws IOException {
        String uploadDir = "uploads/";
        File uploadPath = new File(uploadDir);
        if (!uploadPath.exists()) {
            uploadPath.mkdirs();
        }
        
        String filePath = uploadDir + file.getOriginalFilename();
        file.transferTo(new File(filePath));
        return filePath;
    }
}
