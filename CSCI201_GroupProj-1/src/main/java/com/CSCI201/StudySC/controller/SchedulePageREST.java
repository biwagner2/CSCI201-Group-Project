package com.CSCI201.StudySC.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.CSCI201.StudySC.model.StudyGroup;
import com.google.gson.Gson;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class SchedulePageREST {

    private static final long serialVersionUID = 1L;
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/StudySC";
    private static final String JDBC_USER = "root";
    private static final String JDBC_PASSWORD = "password";

    @GetMapping("/SchedulePageServlet")
    public List<StudyGroup> doGet() {
        List<StudyGroup> studyGroups = new ArrayList<>();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return null; // Consider handling this better
        }

        String query = "SELECT * FROM StudySC.StudyGroup";

        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement ps = conn.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                StudyGroup studyGroup = new StudyGroup(
                        rs.getString("coursename"),
                        rs.getString("meeting_date"), rs.getString("meeting_time_start"), rs.getString("location"),
                        rs.getInt("capacity"));
                studyGroups.add(studyGroup);
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Consider a better way to handle this exception
            return null;
        }

        return studyGroups;
    }
}
