package com.example.john4500.restAPI.models;

import jakarta.persistence.*;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String course_name;

    @Column
    private String course_subject;

    @Column
    private int course_code;

    @Column(columnDefinition = "LONGTEXT")
    private String course_description;

    @Column
    private int course_cat_number;

    @Column
    private String course_prof;

    public String getCourse_prof() {
        return course_prof;
    }

    public void setCourse_prof(String course_prof) {
        this.course_prof = course_prof;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCourse_name() {
        return course_name;
    }

    public void setCourse_name(String course_name) {
        this.course_name = course_name;
    }

    public String getCourse_subject() {
        return course_subject;
    }

    public void setCourse_subject(String course_subject) {
        this.course_subject = course_subject;
    }

    public int getCourse_code() {
        return course_code;
    }

    public void setCourse_code(int course_code) {
        this.course_code = course_code;
    }

    public String getCourse_description() {
        return course_description;
    }

    public void setCourse_description(String course_description) {
        this.course_description = course_description;
    }

    public int getCourse_cat_number() {
        return course_cat_number;
    }

    public void setCourse_cat_number(int course_cat_number) {
        this.course_cat_number = course_cat_number;
    }
}
