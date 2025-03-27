package com.skill_sharing_platform.skill_sharing_platform.Controller;

import com.skill_sharing_platform.skill_sharing_platform.Model.Post;
import com.skill_sharing_platform.skill_sharing_platform.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend to access backend
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public Optional<Post> getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @PostMapping("/{userId}")
    public Post createPost(@PathVariable Long userId, @RequestBody Post post) {
        return postService.createPost(userId, post);
    }

    @PutMapping("/{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody Post post) {
        return postService.updatePost(id, post);
    }

    @DeleteMapping("/{id}")
    public String deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return "Post deleted successfully";
    }

    @PostMapping("/{userId}/upload")
public String uploadFile(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
    try {
        return postService.uploadMedia(file);
    } catch (IOException e) {
        return "File upload failed: " + e.getMessage();
    }
}

}
