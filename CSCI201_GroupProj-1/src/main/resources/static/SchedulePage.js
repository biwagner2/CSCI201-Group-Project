

document.addEventListener('DOMContentLoaded', function () {
    // Fetch study groups from the servlet
    fetch('SchedulePageServlet')
    
        .then(response => response.json())
        .then(data => {
            // Populate the courseContainer div with study group information
            populateCourseContainer(data);
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
