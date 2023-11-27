package com.CSCI201.StudySC.model;

import java.sql.Time;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

    
@Entity
@Getter
@Setter
public class StudyGroup {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer group_id;
	
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "creator_email", referencedColumnName = "email")
    private User creator;
	
    private String coursename;
    private String meetingDate;
    private String meetingTimeStart;
    private String meetingTimeEnd;
    private Integer capacity;
    private String location;
	
    @OneToMany(mappedBy = "studyGroup")
    private List<StudyGroupMembers> studyGroupMembers;
    
    public StudyGroup(User creator, String coursename, String meetingDate, String meetingTimeStart, Integer capacity, String location) {
        this.creator = creator;
        this.coursename = coursename;
        this.meetingDate = meetingDate;
        this.meetingTimeStart = meetingTimeStart;
        this.capacity = capacity;
        this.location = location;
    }
    
//    public StudyGroup(String courseName, String meeting_date,
//    		String meeting_time_start, String location, int capacity) {
//    	
//    	
//        this.coursename = courseName;
//        this.meetingDate = meeting_date;
//        this.meetingTimeStart = meeting_time_start;
//        this.location = location;
//        this.capacity = capacity;
//    }

	

	public User getCreator() {
		return creator;
	}
	public void setCreator(User creator) {
		this.creator = creator;
	}
	public String getCoursename() {
		return coursename;
	}
	public void setCoursename(String coursename) {
		this.coursename = coursename;
	}
	public String getMeetingDate() {
		return meetingDate;
	}
	public void setMeetingDate(String meetingDate) {
		this.meetingDate = meetingDate;
	}
	public String  getMeetingTimeStart() {
		return meetingTimeStart;
	}
	public void setMeetingTimeStart(String meetingTimeStart) {
		this.meetingTimeStart = meetingTimeStart;
	}
	
	public Integer getCapacity() {
		return capacity;
	}
	public void setCapacity(Integer capacity) {
		this.capacity = capacity;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	
	 @Override
	    public String toString() {
	        return "StudyGroup{" +
	                "creator=" + creator +
	                ", coursename='" + coursename + '\'' +
	                ", meetingDate=" + meetingDate +
	                ", meetingTimeStart=" + meetingTimeStart +
	                ", meetingTimeEnd=" + meetingTimeEnd +
	                ", capacity=" + capacity +
	                ", location='" + location + '\'' +
	                '}';
	    }
	 
}