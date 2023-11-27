package com.CSCI201.StudySC.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "StudyGroupMembers")
@Getter
@Setter
public class StudyGroupMembers {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer entry;
	
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "group_id", referencedColumnName = "group_id")
	private StudyGroup studyGroup;
	
	
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "user_email", referencedColumnName = "email")
	private User user;
}

