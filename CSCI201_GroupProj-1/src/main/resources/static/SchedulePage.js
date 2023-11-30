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

        ["Status", "Location", "Time", "Size"].forEach(function (labelText) {
            var label = document.createElement("span");
            label.textContent = labelText;
            labelDiv.appendChild(label);
        });

        courseDiv.appendChild(labelDiv);

        var detailsDiv = document.createElement("div");
        detailsDiv.classList.add("details");

        groups.forEach(group => {
            // console.log(group.groupId);
            var groupDetailsDiv = document.createElement("div");
            groupDetailsDiv.classList.add("groupDetails");

            let statusBar = document.createElement("span");
            statusBar.textContent = 'available';

            groupDetailsDiv.innerHTML = `
                <p>${statusBar.textContent} | ${group.location} - ${group.meetingDate} ${group.meetingTimeStart} | Size: ${group.capacity}</p>
            `;

            var joinBtn = document.createElement("button");
            joinBtn.classList.add("join-btn");
            joinBtn.textContent = "Join";
            if (getCookie('username')) {
                joinBtn.style.backgroundColor = 'green';

                let buttonClicked = false;

                // Function to handle the button click
                function handleJoinButtonClick() {
                    if (!buttonClicked) {
                        let email = getCookie('username');
                        if (email) {
                            // Check if the user is in the study group or if the study group is full
                            makeFetchRequest(group.courseId, email, statusBar);
                        } else {
                            console.error('Email not found in cookie');
                        }

                        // Set the button to gray and disable it after the first click
                        joinBtn.style.backgroundColor = 'dimgray';
                        joinBtn.style.cursor = 'not-allowed';
                        joinBtn.textContent = "Joined";
                        joinBtn.disabled = true;

                        buttonClicked = true;
                    }
                }

                // Add the click event listener
                joinBtn.addEventListener('click', handleJoinButtonClick);
            } else {
                joinBtn.style.backgroundColor = 'dimgray';
                joinBtn.style.cursor = 'not-allowed';
                joinBtn.textContent = "Join";
                joinBtn.disabled = true;
            }

            groupDetailsDiv.appendChild(joinBtn);
            detailsDiv.appendChild(groupDetailsDiv);
        });

        courseDiv.appendChild(detailsDiv);
        courseContainer.appendChild(courseDiv);
    });
}

function logUserOut() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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

function makeFetchRequest(courseId, email, statusBar) {
    const requestData = {
        courseId: courseId,
        email: email
    };

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
            if (text.startsWith("Failed")) {
                statusBar.textContent = 'Joined Already';
                window.alert('joined previously');
            } else {
                statusBar.textContent = 'Joined';
            }
            console.log('Response text:', text);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            window.alert('hey error');
        });
}

document.addEventListener('DOMContentLoaded', function () {
    const loggedIn = document.getElementById('LoggedIn');
    const NotloggedIn = document.getElementById('notLoggedIn');
    const userEmail = getCookie("username");
    if (userEmail) {
        NotloggedIn.style.display = 'none';
        loggedIn.style.display = 'block';
    } else {
        NotloggedIn.style.display = 'block';
        loggedIn.style.display = 'none';
    }

    fetch('SchedulePageServlet')
        .then(response => response.json())
        .then(data => {
            populateCourseContainer(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
