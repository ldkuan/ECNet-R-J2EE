package com.ecm;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.support.SpringBootServletInitializer;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

@SpringBootApplication
//@MapperScan("com.ecm.dao")
public class EcNetApplication extends SpringBootServletInitializer implements EmbeddedServletContainerCustomizer {

	@Override
	public void customize(ConfigurableEmbeddedServletContainer container) {
		container.setPort(8089);
	}
	public static void main(String[] args) {



		SpringApplication.run(EcNetApplication.class, args);
	}

}
