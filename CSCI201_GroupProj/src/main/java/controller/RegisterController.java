package controller;

import org.springframework.ui.Model;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

import model.User;
import service.UserService;

@Controller
public class RegisterController {
	private final UserService userService = new UserService();
	
	@GetMapping("/")
	public String register()
	{
		return "CreateAccount";
	}
	
	@PostMapping("/register")
	public String userRegistration(@ModelAttribute User user, Model model)
	{
		System.out.println(user.toString());
		model.addAttribute("fullname", user.getFullName());
		model.addAttribute("email", user.getUscEmail());
		userService.insertNewUser(user.getFullName(), user.getPassword(), user.getUscEmail());
		return "welcome";
	}
}
