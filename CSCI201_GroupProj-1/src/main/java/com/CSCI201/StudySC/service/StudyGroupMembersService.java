package com.CSCI201.StudySC.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSCI201.StudySC.Repository.StudyGroupMembersRepository;
import com.CSCI201.StudySC.Repository.StudyGroupRepository;
import com.CSCI201.StudySC.Repository.UserRepository;
import com.CSCI201.StudySC.model.StudyGroup;
import com.CSCI201.StudySC.model.StudyGroupMembers;
import com.CSCI201.StudySC.model.User;

@Service
public class StudyGroupMembersService {
	@Autowired
    private StudyGroupMembersRepository studyGroupMembersRepository;
	
	
	@Autowired
    private UserRepository userRepository;
	
	 @Autowired
	 private StudyGroupRepository studyGroupRepository;
	
	 
	 
	 //Take in a groupId parameter (AKA the courseId from the JavaScript file) and uses the built in Spring Boot function "findById" on the studyGroupRepository variable from above to retrieve the respective entry 
	 //from our database's study_group table.
	 //Then the function uses the userEmail (AKA email from the JavaScript file) and uses the built in Spring Boot function "findById" on the userRepository variable from above to retrieve the respective entry from 
	 //our database's user table.
	 public void createStudyGroupMembers(Integer groupId, String userEmail) {
		 //Get respective entry's
		    StudyGroup studyGroup = studyGroupRepository.findById(groupId).orElse(null);
		    User user = userRepository.findById(userEmail).orElse(null);

		    //Check if they are null...
		    if (studyGroup != null && user != null)
		    {
		    	//If neither are NULL, make a new StudyGroupMembers object and set it's data members to the declared StudyGroup and User objects.
		        StudyGroupMembers studyGroupMember = new StudyGroupMembers();
		        studyGroupMember.setStudyGroup(studyGroup);
		        studyGroupMember.setUser(user);

		        // Log statements for debugging
		        System.out.println("Saving StudyGroupMembers: " + studyGroupMember);
		        
		        //Then use the built in Spring Boot function "save" on the studyGroupMembersRepository variable from above to save the newly instantiated studyGroupMember object.
		        studyGroupMembersRepository.save(studyGroupMember);
		    } else {
		        // Handle the case where either the StudyGroup or User is not found
		        System.out.println("StudyGroup or User not found");
		    }
		}
	
	 
	
	
//	public List<StudyGroupMembers> findMembersByStudyGroupId(Integer groupId) 
//	{
//         return studyGroupMembersRepository.findByStudyGroupGroup_Id(groupId);
//     }
//	
}
