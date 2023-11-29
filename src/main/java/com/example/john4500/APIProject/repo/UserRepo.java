package com.example.john4500.APIProject.repo;

import com.example.john4500.APIProject.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {

}
