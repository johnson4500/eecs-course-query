package com.example.john4500.restAPI;

import com.example.john4500.restAPI.models.Course;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RestApiApplicationTests {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate template;

	@Test
	public void AddThenDeleteCourseTest() {
		int course_code = 30300;
		final Course course = new Course("testname", "testsubject", course_code, "testdesc", 30303, "testprof");
		final ResponseEntity<String> response = template.postForEntity(String.format("http://localhost:%d/save", port), course, String.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

		final ResponseEntity<String> deleteResponse = template.exchange(String.format("http://localhost:%d/delete/course/" + course_code, port), HttpMethod.DELETE, HttpEntity.EMPTY, String.class);
		assertThat(deleteResponse.getBody()).isEqualTo("Deleted course with code: " + course_code);
	}
}
