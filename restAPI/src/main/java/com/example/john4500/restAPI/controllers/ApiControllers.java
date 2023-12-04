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

    @PutMapping(value = "update/id/{id}")
    public String updateCourse(@PathVariable long id, @RequestBody Course course) {
        Course updatedCourse = courseRepo.findById(id).get();
        if (course.getCourse_name() != null) {
            updatedCourse.setCourse_name(course.getCourse_name());
        }
        if (course.getCourse_subject() != null) {
            updatedCourse.setCourse_subject(course.getCourse_subject());
        }
        if (course.getCourse_code() > 0) {
            updatedCourse.setCourse_code(course.getCourse_code());
        }
        if (course.getCourse_description() != null) {
            updatedCourse.setCourse_description(course.getCourse_description());
        }
        if (course.getCourse_prof() != null) {
            updatedCourse.setCourse_prof(course.getCourse_prof());
        }
        if (course.getCourse_cat_number() > 0) {
            updatedCourse.setCourse_cat_number(course.getCourse_cat_number());
        }
        courseRepo.save(updatedCourse);
        return "Updated course successfully!";
    }

    @PutMapping(value = "update/course_code/{course_code}")
    public String updateCourseByCourseCode(@PathVariable int course_code, @RequestBody Course course) {
        Course updatedCourse = courseRepo.findByCourseCode(course_code).get(0);
        if (course.getCourse_name() != null) {
            updatedCourse.setCourse_name(course.getCourse_name());
        }
        if (course.getCourse_subject() != null) {
            updatedCourse.setCourse_subject(course.getCourse_subject());
        }
        if (course.getCourse_code() > 0) {
            updatedCourse.setCourse_code(course.getCourse_code());
        }
        if (course.getCourse_description() != null) {
            updatedCourse.setCourse_description(course.getCourse_description());
        }
        if (course.getCourse_prof() != null) {
            updatedCourse.setCourse_prof(course.getCourse_prof());
        }
        if (course.getCourse_cat_number() > 0) {
            updatedCourse.setCourse_cat_number(course.getCourse_cat_number());
        }
        courseRepo.save(updatedCourse);
        return "Updated course successfully!";
    }

    @DeleteMapping(value = "/delete/{id}")
    public String deleteCourse(@PathVariable long id) {
        Course deletedCourse = courseRepo.findById(id).get();
        courseRepo.delete(deletedCourse);
        return "Deleted course with ID: " + id;
    }

    @DeleteMapping(value = "/delete/{id}")
    public String deleteCourseByCode(@PathVariable int id) {
        Course deletedCourse = courseRepo.findByCourseCode(id).get(0);
        courseRepo.delete(deletedCourse);
        return "Deleted course with code: " + id;
    }
}
