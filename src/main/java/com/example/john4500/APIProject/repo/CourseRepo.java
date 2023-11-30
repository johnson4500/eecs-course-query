package com.example.john4500.APIProject.repo;

import com.example.john4500.APIProject.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepo extends JpaRepository<Course, Long> {

    @Query("SELECT c from Course c where c.course_code = ?1")
    List<Course> findByCourseCode(int coursecode);
}
