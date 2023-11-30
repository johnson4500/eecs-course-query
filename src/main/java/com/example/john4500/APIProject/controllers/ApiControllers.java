package com.example.john4500.APIProject.controllers;

import com.example.john4500.APIProject.models.Course;
import com.example.john4500.APIProject.repo.CourseRepo;
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
        return courseRepo.findAll();
    }

    @GetMapping(value = "/courses/id/{id}")
    public Optional<Course> getUsersByID(@PathVariable("id") long id) {
        return courseRepo.findById(id);
    }

    @GetMapping(value = "/courses/Code/{courseCode}")
    public List<Course> getUsersByFistName(@PathVariable("courseCode") int courseCode) {
        return courseRepo.findByCourseCode(courseCode);
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
