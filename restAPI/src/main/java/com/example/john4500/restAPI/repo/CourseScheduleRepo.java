package com.example.john4500.restAPI.repo;

import com.example.john4500.restAPI.models.Course;
import com.example.john4500.restAPI.models.CourseSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseScheduleRepo extends JpaRepository<CourseSchedule, Long> {
    @Query("SELECT c FROM CourseSchedule c WHERE c.course_code = ?1 order by c.section")
    List<CourseSchedule> findByCourseCode(int course_code);
}
