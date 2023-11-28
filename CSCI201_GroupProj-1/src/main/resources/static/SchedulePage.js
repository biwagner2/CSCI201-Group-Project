function populateCourseContainer(studyGroups) {
    var courseContainer = document.querySelector(".courseContainer");
    courseContainer.innerHTML = '';

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
            var groupDetailsDiv = document.createElement("div");
            groupDetailsDiv.classList.add("groupDetails");

            groupDetailsDiv.innerHTML = `
                <p>Status | ${group.location} - ${group.meetingDate} ${group.meetingTimeStart} | Size: ${group.capacity}</p>
            `;

            var joinBtn = document.createElement("button");
            joinBtn.classList.add("join-btn");
            joinBtn.textContent = "Join";
            joinBtn.addEventListener('click', function() {
                let email = getCookie('userEmail');
                email = "testemail@usc.edu";
                if (email) {
                    joinStudyGroup(group.groupId, email);
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

function joinStudyGroup(groupId, email) {
    var studyGroupMembers = {
        studyGroup: {
            id: groupId
        },
        user: {
            email: email
        }
    };

    makeFetchRequest(studyGroupMembers);
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
