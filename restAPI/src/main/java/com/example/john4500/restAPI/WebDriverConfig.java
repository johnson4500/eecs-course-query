package com.example.john4500.restAPI;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebDriverConfig {

    @Bean
    public WebDriver webDriver() {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\johns\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe");
        return new ChromeDriver();
    }
}
