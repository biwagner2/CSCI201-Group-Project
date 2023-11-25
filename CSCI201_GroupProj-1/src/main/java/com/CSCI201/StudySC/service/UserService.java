package com.CSCI201.StudySC.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import com.CSCI201.StudySC.model.User;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    public void insertNewUser(String fullName, String password, String uscEmail) {
        Connection conn = null;
        PreparedStatement st = null;
        try {
        	conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/StudySC?user=root&password=CC9golfalex!"); // add
            st = conn.prepareStatement("INSERT INTO User (name, password, email) VALUES (?, ?, ?)");
            st.setString(1, fullName);
            st.setString(2, password);
            st.setString(3, uscEmail);
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
    
    public User getUserByEmail(String uscEmail) {
        Connection conn = null;
        PreparedStatement st = null;
        ResultSet rs = null;
        User user = null;
        
        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/StudySC?user=root&password=CC9golfalex!"); // add
            st = conn.prepareStatement("SELECT * FROM User WHERE email = ?");
            st.setString(1, uscEmail);
            rs = st.executeQuery();
            
            if (rs.next()) {
                user = new User();
                user.setFullName(rs.getString("name"));
                user.setPassword(rs.getString("password"));
                user.setUscEmail(rs.getString("email"));
            }
        } catch (SQLException sqle) {
            System.out.println(sqle.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
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
        
        return user;
    }
    
}
  