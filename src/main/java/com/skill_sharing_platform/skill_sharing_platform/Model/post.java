package com.skill_sharing_platform.skill_sharing_platform.Model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String mediaUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference  // This is the "back" side of the relationship
    private User user;

}
