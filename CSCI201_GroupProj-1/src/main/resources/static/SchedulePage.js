function populateCourseContainer(studyGroups) {
    var courseContainer = document.querySelector(".courseContainer");
    courseContainer.innerHTML = '';
console.log(studyGroups);
    const groupedStudyGroups = groupByCoursename(studyGroups);

    groupedStudyGroups.forEach((groups, coursename) => {
        var courseDiv = document.createElement("div");
        courseDiv.classList.add("course");

        var courseTitleDiv = document.createElement("div");
        courseTitleDiv.classList.add("courseTitle");

        var randomOpacity = Math.random() * 0.3 + 0.2;
        var randomBgColor = 'rgba(' +
            Math.floor(Math.random() * 256) + ',' +
            Math.floor(Math.random() * 256) + ',' +
            Math.floor(Math.random() * 256) + ',' +
            randomOpacity + ')';

        var heading = document.createElement("h2");
        heading.textContent = coursename;
        heading.style.backgroundColor = randomBgColor;
        courseTitleDiv.appendChild(heading);

        courseDiv.appendChild(courseTitleDiv);

        var labelDiv = document.createElement("div");
        labelDiv.classList.add("label");

        ["Status", "Location", "Time", "Size"].forEach(function(labelText) {
            var label = document.createElement("span");
            label.textContent = labelText;
            labelDiv.appendChild(label);
        });

        courseDiv.appendChild(labelDiv);

        var detailsDiv = document.createElement("div");
        detailsDiv.classList.add("details");

        groups.forEach(group => {
		//	console.log(group.groupId);
            var groupDetailsDiv = document.createElement("div");
            groupDetailsDiv.classList.add("groupDetails");

            groupDetailsDiv.innerHTML = `
                <p>Status | ${group.location} - ${group.meetingDate} ${group.meetingTimeStart} | Size: ${group.capacity}</p>
            `;

            var joinBtn = document.createElement("button");
            joinBtn.classList.add("join-btn");
            joinBtn.textContent = "Join";
            joinBtn.addEventListener('click', function() {
                let email = getCookie('userEmail'); //THIS NEEDS TO BE FIXED THE COOKIE ISN'T WORKING. RIGHT NOW HAVE TO MANUALLY SET EMAIL!!!!
                email = "biwagner@usc.edu";
                if (email) {
					//console.log(group.groupId);
                  //  joinStudyGroup(group.groupId, email); 
                  joinStudyGroup(group.courseId, email);
                } else {
                    console.error('Email not found in cookie');
                }
            });

            groupDetailsDiv.appendChild(joinBtn);
            detailsDiv.appendChild(groupDetailsDiv);
        });

        courseDiv.appendChild(detailsDiv);
        courseContainer.appendChild(courseDiv);
    });
}

function groupByCoursename(studyGroups) {
    const groupedStudyGroups = new Map();

    studyGroups.forEach(group => {
		
		//console.log(group);
        const coursename = group.coursename;

        if (!groupedStudyGroups.has(coursename)) {
            groupedStudyGroups.set(coursename, []);
        }

        groupedStudyGroups.get(coursename).push(group);
    });

    return groupedStudyGroups;
}

function getCookie(name) {
    let cookieArray = document.cookie.split('; ');
    let cookie = cookieArray.find(row => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
}



//I COMMENTED OUT THE OLD FUNCTIONS THAT WERE TAKING IN "groupId" AND SWITCHED IT TO "courseId" IN MY REPLACEMENT FUNCTIONS DOWN BELOW...
/*function joinStudyGroup(groupId, email) {
    var studyGroupMembersRequest = {
        studyGroup: {
            group_id: groupId
        },
        user: {
            email: email
        }
    };

    makeFetchRequest(studyGroupMembersRequest);
}

function makeFetchRequest(studyGroupMembers) {
    fetch('/addToStudyMembers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(studyGroupMembers),
    })
    .then(response => {
        if (!response.ok) {
            console.error('Server responded with status:', response.status);
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(text => {
        try {
            const data = JSON.parse(text);
            console.log('JSON data:', data);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            console.log('Original text:', text);
        }
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });
}
*/

/*
function joinStudyGroup(groupId, email) {
    makeFetchRequest(groupId, email);
}*/

function joinStudyGroup(courseId, email) { //NOW USING courseId instead.
    makeFetchRequest(courseId, email);
}


function makeFetchRequest(courseId, email) { //NOW USING courseId instead.
    const requestData = {
        courseId: courseId,  // Use courseId instead of groupId
        email: email
    };

  /*  fetch(`/addToStudyMembers?courseId=${courseId}&email=${email}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(response => {
        if (!response.ok) {
            console.error('Server responded with status:', response.status);
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(text => {
        try {
            const data = JSON.parse(text);
            console.log('JSON data:', data);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            console.log('Original text:', text);
        }
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });*/
    
    //CHANGED THE FETCH CALL SO THAT INSTEAD OF GIVING THE "SchedulePageREST" controller function a JSON, we just send the two values we need which is the course Id and an email.
    //courseId is an Integer and email is a String. In the "SchedulePageREST" controller, the createStudyGroupMembers function takes these two parameters then send
     fetch(`/addToStudyMembers?courseId=${courseId}&email=${email}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(response => {
        if (!response.ok) {
            console.error('Server responded with status:', response.status);
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(text => {
        console.log('Response text:', text);
        // Handle the text response as needed, e.g., display a message to the user
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });
}

/*
function makeFetchRequest(groupId, email) {
    const requestData = {
        groupId: groupId,
        email: email
    };

    fetch(`/addToStudyMembers?groupId=${groupId}&email=${email}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(response => {
        if (!response.ok) {
            console.error('Server responded with status:', response.status);
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(text => {
        try {
            const data = JSON.parse(text);
            console.log('JSON data:', data);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            console.log('Original text:', text);
        }
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });
}*/

document.addEventListener('DOMContentLoaded', function() {
    fetch('SchedulePageServlet')
        .then(response => response.json())
        .then(data => {
            populateCourseContainer(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
