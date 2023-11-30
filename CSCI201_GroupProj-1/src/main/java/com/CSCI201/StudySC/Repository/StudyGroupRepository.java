package com.CSCI201.StudySC.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.CSCI201.StudySC.model.StudyGroup;

@Repository
public interface StudyGroupRepository extends JpaRepository<StudyGroup, Integer> {
	//Source:  https://youtu.be/_Jnu_jHfQbM?feature=shared
	public StudyGroup findByGroupId(Integer groupId);
}

 