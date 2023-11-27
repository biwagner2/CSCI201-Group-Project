package com.CSCI201.StudySC.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Time;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSCI201.StudySC.Repository.StudyGroupRepository;
import com.CSCI201.StudySC.Repository.UserRepository;
import com.CSCI201.StudySC.model.StudyGroup;
import com.CSCI201.StudySC.model.User;

@Service
public class StudyGroupService {
	
	@Autowired
	private StudyGroupRepository studyGroupRepository;
	
	@Autowired
	private UserRepository userRepository;

//    public void insertNewStudyGroup(StudyGroup studyGroup) {
//        Connection conn = null;
//        PreparedStatement st = null;
//        try {
//            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/StudySC?user=root&password=Bwagner2003.");
//            st = conn.prepareStatement("INSERT INTO StudyGroup (creator_email, coursename, meeting_date, meeting_time_start, capacity, location) VALUES (?, ?, ?, ?, ?, ?, ?)");
//            st.setString(1, studyGroup.getCreator().getUscEmail());
//            st.setString(2, studyGroup.getCoursename());
//            st.setDate(3, new java.sql.Date(studyGroup.getMeetingDate().getTime()));
//            st.setTime(4, studyGroup.getMeetingTimeStart());
//            st.setInt(6, studyGroup.getCapacity());
//            st.setString(7, studyGroup.getLocation());
//            st.executeUpdate();
//        } catch (SQLException sqle) {
//            System.out.println(sqle.getMessage());
//        } finally {
//            try {
//                if (st != null) {
//                    st.close();
//                }
//                if (conn != null) {
//                    conn.close();
//                }
//            } catch (SQLException sqle) {
//                System.out.println(sqle.getMessage());
//            }
//        }
//    }
    
    
    public StudyGroup createStudyGroup(StudyGroup studyGroup, User creator) {
    	 //HERE IS WHERE WE ADD THE CREATOR PART OF THE studyGroup. Use the email of the current signed in 
    								//user to find which user in the User table to set the creator equal to.
         // Check if the user already exists
         User currentUser = userRepository.findByEmail(creator.getUscEmail());
         if (currentUser != null) 
         {
             // Use the existing user
             studyGroup.setCreator(currentUser);
         } 
         else 
         {
             // Save the new user
             userRepository.save(creator);
         }
         
         System.out.println(studyGroup.toString());
         // Save the study group
         return studyGroupRepository.save(studyGroup);
     }
    
   
    
    
    
}
