package com.CSCI201.StudySC.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.CSCI201.StudySC.model.StudyGroup;
import com.CSCI201.StudySC.model.User;
import com.CSCI201.StudySC.service.StudyGroupService;
import com.CSCI201.StudySC.service.UserService;




@Controller
public class RegisterController {
	//private final UserService userService = new UserService();
	@Autowired
	private UserService userService;
	private final StudyGroupService studyGroupService = new StudyGroupService();
	private User currUser = null;
	
	//Login Page opens by default
    @GetMapping("/")
    public String login() {
        return "login.html";
    }
    
    //Authenticate user
    @PostMapping("/login")
    public String loginUser(@RequestParam String email, @RequestParam String password, Model model) {
    	// Validate the user credentials against the database
        User user = userService.getUserByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            currUser = user;
            model.addAttribute("fullname", currUser.getFullName());
            model.addAttribute("email", currUser.getUscEmail());
            return "SchedulePage";
        } else {
            // Handle invalid login
            return "login.html";
        }
    }

    //On Login Page, when user clicks Sign Up...
    @GetMapping("/register")
    public String register() {
        return "CreateAccount";
    }
    
  //On Login Page, when user clicks Guest Mode...
    @GetMapping("/scheduleGuest")
    public String showSchedulePageGuest() {
       
        return "SchedulePage";
    }
    
    //On Login Page, when user clicks Sign In...
    //OR
    //On UserProfile Page, when user clicks Home in the nav bar...
    @GetMapping("/schedule")
    public String showSchedulePage() {
       
        return "SchedulePage";
    }
    
    //On UserProfile Page, when user clicks User... (ACTUALLY might not be necessary since clicking the button shouldn't change pages)
    //OR
    //On Schedule Page, when user clicks Profile in nav bar...
    @GetMapping("/userProfile")
    public String showUserProfilePage(Model model) {
    	model.addAttribute("fullname", currUser.getFullName());
        model.addAttribute("email", currUser.getUscEmail());
        return "UserProfile";
    }
    
    
    
    
    //On Schedule Page, when user clicks New Group...
    @GetMapping("newStudyGroup")
    public String showNewStudyGroupPage()
    {
    	return "NewStudyGroup";
    }
   
    @PostMapping("/userProfile")
    public String userRegistration(@ModelAttribute User user, Model model) {
    	User createdUser = userService.create(user);
    	   
        if(createdUser == null) //If unable to create a new user because of reused entry...
        {
        	model.addAttribute("errorMessage", "Email is already in use. Please use a different one.");
        	return "CreateAccount";
        }
        else //Proceed to next page....
        {
        	currUser = createdUser;
            model.addAttribute("fullname", currUser.getFullName());
            model.addAttribute("email", currUser.getUscEmail());
            return "UserProfile";
        }
    }
    
    
    //Add a post mapping that add new group to the database from inside the newStudyGroup page then take you back to schedule page...
//    @PostMapping("/schedule")
//    public String createNewStudyGroupPage(@ModelAttribute StudyGroup studyGroup, Model model)
//    {
//    	System.out.println(studyGroup.toString());
//    	studyGroupService.insertNewStudyGroup(studyGroup);
//    	return "SchedulePage";
//    }
//    
    
    //SHOULD LOOK INTO USING JPA and Hibernate Annotations so we don't need to use JDBC calls!!!
    
    //On register page (AKA CreateAccount.html) when user clicks Register
    
    
    
    
    
    
    
    
    
    
    
}