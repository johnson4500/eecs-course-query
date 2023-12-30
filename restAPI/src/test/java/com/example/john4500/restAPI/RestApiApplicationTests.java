package com.example.john4500.restAPI;

import com.example.john4500.restAPI.models.Course;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.openqa.selenium.WebDriver;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RestApiApplicationTests {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate template;

	@Autowired
	private WebDriver webDriver;

	@Test
	public void AddThenDeleteCourseTest() {
		int course_code = 30300;
		final Course course = new Course("testname", "testsubject", course_code, "testdesc", 30303, "testprof");
		final ResponseEntity<String> response = template.postForEntity(String.format("http://localhost:%d/save", port), course, String.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

		final ResponseEntity<String> deleteResponse = template.exchange(String.format("http://localhost:%d/delete/course/" + course_code, port), HttpMethod.DELETE, HttpEntity.EMPTY, String.class);
		assertThat(deleteResponse.getBody()).isEqualTo("Deleted course with code: " + course_code);
	}

	@Test
	public void webtest() {
//		webDriver.get("https://www.ratemyprofessors.com/search/professors/1495?q=James%20Smith");
//
//		try {
//			Thread.sleep(5000); // Sleep for 5000 milliseconds (5 seconds)
//		} catch (InterruptedException e) {
//			e.printStackTrace();
//		}
//
//		String cssSelector = "#root > div > div > div:nth-child(4) > div.SearchResultsPage__StyledSearchResultsPage-vhbycj-0.bgplVn > div.SearchResultsPage__SearchResultsWrapper-vhbycj-1.gxbBpy > div:nth-child(4) > a:nth-child(2) > div > div.TeacherCard__NumRatingWrapper-syjs0d-2.joEEbw > div > div.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2.gcFhmN"; // Replace with your CSS selector
//		WebElement element = webDriver.findElement(By.cssSelector(cssSelector));
//
//		// Extract text from the element
//		String extractedText = element.getText();
//
//		// Print the extracted text
//		System.out.println("Text extracted: " + extractedText);
//
//		// Close the browser
//		webDriver.quit();
		final ResponseEntity<String> response = template.exchange(String.format("http://localhost:%d/prof/profrating/Kai-Zhuang", port), HttpMethod.GET, HttpEntity.EMPTY, String.class);
		System.out.println(response.getBody());
	}
}
