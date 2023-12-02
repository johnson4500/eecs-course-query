package com.example.john4500.restAPI.repo;

import com.example.john4500.restAPI.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface CourseRepo extends JpaRepository<Course, Long> {

    @Query("SELECT c FROM Course c WHERE c.course_code = ?1")
    List<Course> findByCourseCode(int course_code);

    @Query(value = "SELECT * FROM Course WHERE course_name like %?1%", nativeQuery = true)
    List<Course> findByCourseName(String course_name);

    @Query(value = "SELECT * FROM Course WHERE course_prof like %?1%", nativeQuery = true)
    List<Course> findByProfessorName(String professor_name);

    @Query(value = "SELECT * FROM Course ORDER BY Course.course_code ASC", nativeQuery = true)
    List<Course> findAllSortedByCode();
}
