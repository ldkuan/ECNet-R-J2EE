package com.ecm;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.ecm.dao")
public class EcNetApplication {
	public static void main(String[] args) {
		SpringApplication.run(EcNetApplication.class, args);
	}
}
