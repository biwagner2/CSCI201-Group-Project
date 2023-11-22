package com.CSCI201.StudySC.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.CSCI201.StudySC.model.User;
import com.CSCI201.StudySC.service.UserService;


@Controller
public class RegisterController {
	private final UserService userService = new UserService();

    @GetMapping("/")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "CreateAccount";
    }

    @PostMapping("/register")
    public String userRegistration(@ModelAttribute User user, Model model) {
        System.out.println(user.toString());
        model.addAttribute("fullname", user.getFullName());
        model.addAttribute("email", user.getUscEmail());
        userService.insertNewUser(user.getFullName(), user.getPassword(), user.getUscEmail());
        return "UserProfile";
    }
}



 