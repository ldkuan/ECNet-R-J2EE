package com.ecm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	@RequestMapping(value = "/login")
	public String getLoginView() {
		return "login";
	}

	@RequestMapping(value = "/model")
	public String getModelView() {
		return "model";
	}

	@RequestMapping(value = "/logic")
	public String getLogicView() {
		return "logic";
	}
}
