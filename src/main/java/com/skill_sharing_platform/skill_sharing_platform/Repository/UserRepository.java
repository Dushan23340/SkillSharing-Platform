package com.skill_sharing_platform.skill_sharing_platform.Repository;

import com.skill_sharing_platform.skill_sharing_platform.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
       Optional<User> findByEmail (String email);
       Optional<User> findByPassword (String password);
}

