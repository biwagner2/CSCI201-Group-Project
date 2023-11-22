package com.CSCI201.StudySC.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.CSCI201.StudySC.model.StudyGroup;
import com.CSCI201.StudySC.model.User;
import com.CSCI201.StudySC.service.StudyGroupService;
import com.CSCI201.StudySC.service.UserService;


@Controller
public class RegisterController {
	private final UserService userService = new UserService();
	private final StudyGroupService studyGroupService = new StudyGroupService();

	//Login Page opens by default
    @GetMapping("/")
    public String login() {
        return "login";
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
    public String showUserProfilePage() {
       
        return "UserProfile";
    }
    
    
    //On Schedule Page, when user clicks New Group...
    @GetMapping("newStudyGroup")
    public String showNewStudyGroupPage()
    {
    	return "NewStudyGroup";
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
    @PostMapping("/userProfile")
    public String userRegistration(@ModelAttribute User user, Model model) {
        System.out.println(user.toString());
        model.addAttribute("fullname", user.getFullName());
        model.addAttribute("email", user.getUscEmail());
        userService.insertNewUser(user.getFullName(), user.getPassword(), user.getUscEmail());
        return "UserProfile";
    }
    
    
    
    
    
    
    
    
    
}