// CODE FROM ORIGINAL FILE
document.addEventListener('DOMContentLoaded', function () {
    // Fetch study groups from the servlet
    fetch('SchedulePageServlet')
    
        .then(response => response.json())
        .then(data => {
            // Populate the courseContainer div with study group information
           
           populateCourseContainer(data);
           updateUI();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
  

function populateCourseContainer(studyGroups) {
    // Get the existing courses container
    var courseContainer = document.querySelector(".courseContainer");

    // Clear existing content in the courseContainer
    courseContainer.innerHTML = '';

    // Organize study groups by coursename
    const groupedStudyGroups = groupByCoursename(studyGroups);

    // Iterate through each coursename and its study groups
    groupedStudyGroups.forEach((groups, coursename) => {
        // Create a course div
        var courseDiv = document.createElement("div");
        courseDiv.classList.add("course");

        // Create course title div
        var courseTitleDiv = document.createElement("div");
        courseTitleDiv.classList.add("courseTitle");

        // Generate a random background color for the h2 (similar to the original code)
        var randomOpacity = Math.random() * 0.3 + 0.2;
        var randomBgColor = 'rgba(' +
            Math.floor(Math.random() * 256) + ',' +
            Math.floor(Math.random() * 256) + ',' +
            Math.floor(Math.random() * 256) + ',' +
            randomOpacity + ')';

        // Create an h2 element with a random background color and append it to the courseTitle div
        var heading = document.createElement("h2");
        heading.textContent = coursename; // Set the coursename as the title
        heading.style.backgroundColor = randomBgColor;
        courseTitleDiv.appendChild(heading);

        courseDiv.appendChild(courseTitleDiv);

        // Create label div
        var labelDiv = document.createElement("div");
        labelDiv.classList.add("label");

        ["Status", "Location", "Time", "Size"].forEach(function (labelText) {
            var label = document.createElement("a");
            label.textContent = labelText;
            labelDiv.appendChild(label);
        });

        courseDiv.appendChild(labelDiv);

        // Create details div
        var detailsDiv = document.createElement("div");
        detailsDiv.classList.add("details");

        // Iterate through study groups for this coursename and display information
        groups.forEach(group => {
            var groupDetailsDiv = document.createElement("div");
            groupDetailsDiv.classList.add("details");

            // Customize the details content based on study group information
            groupDetailsDiv.innerHTML = `
                <p>${group.courseName} | ${group.startTime} - ${group.endTime} | Size: ${group.size}</p>
            `;

            var joinBtn = document.createElement("div");
            joinBtn.classList.add("join-btn");
            joinBtn.textContent = "Join";

            groupDetailsDiv.appendChild(joinBtn);
            detailsDiv.appendChild(groupDetailsDiv);
        });

        // Append the details div to the course div
        courseDiv.appendChild(detailsDiv);

        // Append the course div to the existing courses container
        courseContainer.appendChild(courseDiv);
    });
}

function groupByCoursename(studyGroups) {
    const groupedStudyGroups = new Map();

    studyGroups.forEach(group => {
        const coursename = group.courseName;

        if (!groupedStudyGroups.has(coursename)) {
            groupedStudyGroups.set(coursename, []);
        }

        groupedStudyGroups.get(coursename).push(group);
    });

    return groupedStudyGroups;
}

// NOT FROM ORIGINAL FILE
// Function to logout the user (expire their cookie)
function logout() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Function to check if the user is logged in
function getCookie(name){
    const decodedValue = decodeURIComponent(document.cookie);
    const arrayOfCookies = decodedValue.split("; ");
    let result = null;
    
    arrayOfCookies.forEach(element => {
        if(element.indexOf(name) == 0){
            result = element.substring(name.length + 1)
        }
    })
    return result;
}

// Function to display certain elements for user or guest mode
function updateUI() {
    const user = getCookie("username");

    // If the user is not logged in, display guest mode
    if (!user) {
		console.log("Entered guest mode...");
        // User is not logged in, modify the CSS of join buttons
        const joinBtns = document.querySelectorAll('.join-btn');
        joinBtns.forEach(btn => {
            btn.style.backgroundColor = '#808080'; // Change background color to gray
            btn.style.cursor = 'not-allowed'; // Change cursor icon
        });

        // Hide create new group button
        const newStudyGroupBtn = document.getElementById("newGroupButton");
        newStudyGroupBtn.style.pointerEvents = 'none';
        newStudyGroupBtn.style.display = 'none';
        
        // Change "Profile" link to "Log In"
        const profileBtn = document.getElementById("profileButton");
        profileBtn.textContent = 'Log In';
        profileBtn.href = '/';

        // Hide logout button
        const logoutBtn = document.getElementById("logoutButton");
        logoutBtn.style.display = 'none';

    } else {
		console.log("Entered user mode...");
		// If the user is not logged in, log them out by removing their cookie
        logout();
    }
}