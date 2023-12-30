package com.example.john4500.restAPI.controllers;

import com.example.john4500.restAPI.models.Course;
import com.example.john4500.restAPI.models.CourseSchedule;
import com.example.john4500.restAPI.repo.CourseRepo;
import com.example.john4500.restAPI.repo.CourseScheduleRepo;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

@RestController
public class ApiControllers {

    @Autowired
    private CourseRepo courseRepo;
    @Autowired
    private CourseScheduleRepo courseScheduleRepo;
    @Autowired
    private WebDriver webDriver;

    @RequestMapping("/")
    public String getGreeting() {
        return "Hello world!!!!!11!!";
    }

    @GetMapping(value = "/courses")
    public List<Course> getCourses() {
        return courseRepo.findAllSortedByCode();
    }

    @GetMapping(value = "/courseSchedules")
    public List<CourseSchedule> getCourseSchedules() {
        return courseScheduleRepo.findAll();
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

    @GetMapping(value = "/courseSchedules/{courseCode}")
    public List<CourseSchedule> getCourseScheduleByCourseCode(@PathVariable("courseCode") int courseCode) {
        return courseScheduleRepo.findByCourseCode(courseCode);
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

    @DeleteMapping(value = "/delete/id/{id}")
    public String deleteCourse(@PathVariable long id) {
        Course deletedCourse = courseRepo.findById(id).get();
        courseRepo.delete(deletedCourse);
        return "Deleted course with ID: " + id;
    }

    @DeleteMapping(value = "/delete/course/{course_code}")
    public String deleteCourseByCode(@PathVariable int course_code) {
        Course deletedCourse = courseRepo.findByCourseCode(course_code).get(0);
        courseRepo.delete(deletedCourse);
        return "Deleted course with code: " + course_code;
    }

    @PostMapping(value = "/save/courseSchedule")
    public String saveCourse(@RequestBody CourseSchedule courseSchedule) {
        courseScheduleRepo.save(courseSchedule);
        return "Saved course schedule successfully!";
    }

    @GetMapping(value = "/prof/profrating/{profName}")
    public String getProfRating(@PathVariable("profName") String profName) {
        String[] splitName = profName.split("-");
        webDriver.get("https://www.ratemyprofessors.com/search/professors/1495?q=" + splitName[0] + "%20" + splitName[1]);

//        try {
//            Thread.sleep(10000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }

        WebDriverWait wait = new WebDriverWait(webDriver, Duration.ofSeconds(5));
        wait.until(webDriver -> ((JavascriptExecutor) webDriver).executeScript("return document.readyState").equals("complete"));

//        String cssSelector = "#root > div > div > div:nth-child(4) > div.SearchResultsPage__StyledSearchResultsPage-vhbycj-0.bgplVn > div.SearchResultsPage__SearchResultsWrapper-vhbycj-1.gxbBpy > div:nth-child(3) > a:nth-child(1) > div > div.TeacherCard__NumRatingWrapper-syjs0d-2.joEEbw > div > div.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2.icXUyq"; // Replace with your CSS selector
//
//        WebElement element = webDriver.findElement(By.cssSelector(cssSelector));

//        WebElement parentDiv = webDriver.findElement(By.className("TeacherCard__NumRatingWrapper-syjs0d-2 joEEbw"));
//
//        // Extract text from the element
//        String extractedText = element.getText();
//
//        System.out.println(extractedText);

        List<WebElement> nestedDivs = webDriver.findElements(By.cssSelector("#root > div > div > div:nth-child(4) > div.SearchResultsPage__StyledSearchResultsPage-vhbycj-0.bgplVn > div.SearchResultsPage__SearchResultsWrapper-vhbycj-1.gxbBpy > div:nth-child(4) > a:nth-child(1)"));

        // Iterate through the nested divs and perform some action
        for (WebElement nestedDiv : nestedDivs) {
            // Perform your action on each nested div
            System.out.println(nestedDiv.getText() + " bro");
        }

        // Close the browser
        webDriver.close();

        return "hello";
    }
}
