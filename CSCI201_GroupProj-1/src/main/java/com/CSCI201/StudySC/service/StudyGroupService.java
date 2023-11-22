package com.CSCI201.StudySC.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Time;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.CSCI201.StudySC.model.StudyGroup;
import com.CSCI201.StudySC.model.User;

@Service
public class StudyGroupService {

    public void insertNewStudyGroup(StudyGroup studyGroup) {
        Connection conn = null;
        PreparedStatement st = null;
        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/StudySC?user=root&password=Bwagner2003.");
            st = conn.prepareStatement("INSERT INTO StudyGroup (creator_email, coursename, meeting_date, meeting_time_start, meeting_time_end, capacity, location) VALUES (?, ?, ?, ?, ?, ?, ?)");
            st.setString(1, studyGroup.getCreator().getUscEmail());
            st.setString(2, studyGroup.getCoursename());
            st.setDate(3, new java.sql.Date(studyGroup.getMeetingDate().getTime()));
            st.setTime(4, studyGroup.getMeetingTimeStart());
            st.setTime(5, studyGroup.getMeetingTimeEnd());
            st.setInt(6, studyGroup.getCapacity());
            st.setString(7, studyGroup.getLocation());
            st.executeUpdate();
        } catch (SQLException sqle) {
            System.out.println(sqle.getMessage());
        } finally {
            try {
                if (st != null) {
                    st.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException sqle) {
                System.out.println(sqle.getMessage());
            }
        }
    }
}
