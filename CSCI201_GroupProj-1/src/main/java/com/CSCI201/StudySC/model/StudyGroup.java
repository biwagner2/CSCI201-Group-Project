package com.CSCI201.StudySC.model;

import java.sql.Time;
import java.util.Date;

public class StudyGroup {

    private User creator;
    private String coursename;
    private Date meetingDate;
    private Time meetingTimeStart;
    private Time meetingTimeEnd;
    private Integer capacity;
    private String location;
	
    public StudyGroup(User creator, String coursename, Date meetingDate, Time meetingTimeStart, Time meetingTimeEnd, Integer capacity, String location) {
        this.creator = creator;
        this.coursename = coursename;
        this.meetingDate = meetingDate;
        this.meetingTimeStart = meetingTimeStart;
        this.meetingTimeEnd = meetingTimeEnd;
        this.capacity = capacity;
        this.location = location;
    }
    
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
	public Date getMeetingDate() {
		return meetingDate;
	}
	public void setMeetingDate(Date meetingDate) {
		this.meetingDate = meetingDate;
	}
	public Time getMeetingTimeStart() {
		return meetingTimeStart;
	}
	public void setMeetingTimeStart(Time meetingTimeStart) {
		this.meetingTimeStart = meetingTimeStart;
	}
	public Time getMeetingTimeEnd() {
		return meetingTimeEnd;
	}
	public void setMeetingTimeEnd(Time meetingTimeEnd) {
		this.meetingTimeEnd = meetingTimeEnd;
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