package com.CSCI201.StudySC.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.CSCI201.StudySC.model.StudyGroup;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class UserProfilePageREST {
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/StudySC";
    private static final String JDBC_USER = "root";
    private static final String JDBC_PASSWORD = "#Salvatore7";

    @GetMapping("/UserStudyGroupServlet")
    public List<StudyGroup> doGet(@RequestParam("email") String email) {
        List<StudyGroup> studyGroups = new ArrayList<>();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return null; // Consider handling this better
        }

        String query = "SELECT * FROM StudySC.study_group_members WHERE user_email = ?";


        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
            PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                StudyGroup studyGroup = new StudyGroup(
                        null,
                        rs.getString("coursename"),
                        rs.getString("meetingDate"),
                        rs.getString("meetingTimeStart"),
                        rs.getInt("capacity"),
                        rs.getString("location")
                );
                studyGroups.add(studyGroup);
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Consider a better way to handle this exception
            return null;
        }

        return studyGroups;
    }
    
    @DeleteMapping("/deleteUser/{email}")
    public String deleteUser(@PathVariable String email) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return "Error: Unable to delete user.";
        }

        String deleteUserQuery = "DELETE FROM StudySC.user WHERE user_email = ?";

        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement ps = conn.prepareStatement(deleteUserQuery)) {
            ps.setString(1, email);
            int deletedRows = ps.executeUpdate();

            if (deletedRows > 0) {
                return "User with email " + email + " has been deleted.";
            } else {
                return "User with email " + email + " not found.";
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return "Error: Unable to delete user.";
        }
    }
    
    
    @DeleteMapping("/deleteUserFromGroup/{email}/{groupId}")
    public String deleteUserFromGroup(@PathVariable String email, @PathVariable int groupId) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return "Error: Unable to delete user from group.";
        }

        String deleteUserFromGroupQuery = "DELETE FROM StudySC.study_group_members WHERE user_email = ? AND group_id = ?";

        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement ps = conn.prepareStatement(deleteUserFromGroupQuery)) {
            ps.setString(1, email);
            ps.setInt(2, groupId);
            int deletedRows = ps.executeUpdate();

            if (deletedRows > 0) {
                return "User with email " + email + " has been removed from group with ID " + groupId + ".";
            } else {
                return "User with email " + email + " not found in group with ID " + groupId + ".";
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return "Error: Unable to delete user from group.";
        }
    }
}
