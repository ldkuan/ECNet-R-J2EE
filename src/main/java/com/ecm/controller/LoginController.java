package com.ecm.controller;

import com.ecm.service.UserManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class LoginController {

    @Autowired
    private UserManageService userService;

    @RequestMapping(value="/checkLogin")
    public int getAllCourses(@RequestParam("username") String username, @RequestParam("password") String password){
        String password_true = userService.getPassword(username);

        if(password_true==null)
            return 0;
        else if(password.equals(password_true))
            return 1;
        else
            return -1;
    }
}
