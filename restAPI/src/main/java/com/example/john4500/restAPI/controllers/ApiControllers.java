package com.example.john4500.restAPI.controllers;

import com.example.john4500.restAPI.models.Course;
import com.example.john4500.restAPI.repo.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ApiControllers {

    @Autowired
    private CourseRepo courseRepo;

    @RequestMapping("/")
    public String getGreeting() {
        return "Hello world!!!!!11!!";
    }

    @GetMapping(value = "/courses")
    public List<Course> getCourses() {
        return courseRepo.findAllSortedByCode();
    }

    @GetMapping(value = "/courses/id/{id}")
    public Optional<Course> getCoursesByID(@PathVariable("id") long id) {
        return courseRepo.findById(id);
    }

    @GetMapping(value = "/courses/Code/{courseCode}")
    public List<Course> getCoursesByCourseCode(@PathVariable("courseCode") int courseCode) {
        return courseRepo.findByCourseCode(courseCode);
    }

    @GetMapping(value = "/courses/Name/{courseName}")
    public List<Course> getCoursesByName(@PathVariable("courseName") String courseName) {
        return courseRepo.findByCourseName(courseName);
    }

    @GetMapping(value = "/courses/Professor/{professorName}")
    public List<Course> getCoursesByProfessorName(@PathVariable("professorName") String professorName) {
        return courseRepo.findByProfessorName(professorName);
    }

    @PostMapping(value = "/save")
    public String saveCourse(@RequestBody Course course) {
        courseRepo.save(course);
        return "Saved course successfully!";
    }

    @PutMapping(value = "update/{id}")
    public String updateCourse(@PathVariable long id, @RequestBody Course course) {
        Course updatedCourse = courseRepo.findById(id).get();
        updatedCourse.setCourse_name(course.getCourse_name());
        updatedCourse.setCourse_subject(course.getCourse_subject());
        updatedCourse.setCourse_code(course.getCourse_code());
        updatedCourse.setCourse_description(course.getCourse_description());
        courseRepo.save(updatedCourse);
        return "Updated course successfully!";
    }

    @DeleteMapping(value = "/delete/{id}")
    public String deleteUser(@PathVariable long id) {
        Course deletedCourse = courseRepo.findById(id).get();
        courseRepo.delete(deletedCourse);
        return "Deleted course with ID: " + id;
    }
}
