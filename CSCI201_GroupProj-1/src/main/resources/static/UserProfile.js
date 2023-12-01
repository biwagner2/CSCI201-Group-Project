/**
 * 
 */

function editName() {
    document.getElementById('nameDisplay').style.display = 'none';
    document.getElementById('editNameForm').style.display = 'block';
}

function saveName() {
    var newName = document.getElementById('nameInput').value;
    document.getElementById('nameSpan').textContent = newName;
    document.getElementById('nameDisplay').style.display = 'block';
    document.getElementById('editNameForm').style.display = 'none';
}

function cancelNameEdit() {
    document.getElementById('nameDisplay').style.display = 'block';
    document.getElementById('editNameForm').style.display = 'none';
}

function editPhone() {
    document.getElementById('phoneDisplay').style.display = 'none';
    document.getElementById('editPhoneForm').style.display = 'block';
}

function savePhone() {
    var newName = document.getElementById('phoneInput').value;
    document.getElementById('phoneSpan').textContent = newName;
    document.getElementById('phoneDisplay').style.display = 'block';
    document.getElementById('editPhoneForm').style.display = 'none';
}

function cancelPhoneEdit() {
    document.getElementById('phoneDisplay').style.display = 'block';
    document.getElementById('editPhoneForm').style.display = 'none';
}

function editPass() {
    document.getElementById('passDisplay').style.display = 'none';
    document.getElementById('editPassForm').style.display = 'block';
}

function savePass() {
    var newName = document.getElementById('passInput').value;
    document.getElementById('passSpan').textContent = newName;
    document.getElementById('passDisplay').style.display = 'block';
    document.getElementById('editPassForm').style.display = 'none';
}

function cancelPassEdit() {
    document.getElementById('passDisplay').style.display = 'block';
    document.getElementById('editPassForm').style.display = 'none';
}

function deleteCourse(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function addCourse() {
    var table = document.getElementById("scheduleTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    var newCourseInput = document.getElementById("newCourseInput");
    var newCourseName = newCourseInput.value.trim();

    if (newCourseName === "") {
        alert("Please enter a course name.");
        return;
    }

    cell1.innerHTML = newCourseName;
    cell2.innerHTML = "<button onclick='deleteCourse(this)'>Delete</button>";


    // Clear the input field after adding the course.
    newCourseInput.value = "";
}

// Populate study groups
document.addEventListener('DOMContentLoaded', function () {
    // Fetch study groups from the servlet 

    var email = sessionStorage.getItem('loggedInUser');

    fetch('/getUserName?email=' +  email)
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // Assuming the response is plain text
      })
      .then(userName => {
        // Handle the user name as needed
        console.log(`User Name: ${userName}`);
        document.getElementById('fullName').innerText = userName;
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });

    

    fetch('UserStudyGroupServlet?email=' +  email)
        .then(response => response.json())
        .then(data => {
            // Populate the courseContainer div with study group information
            populateStudyGroupContainer(data);
            console.log(email);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

        

        // Check if the storedEmail exists and update the Thymeleaf value
        if (email) {
            document.getElementById('emailValue').innerText = email;
        }
    
});

function populateStudyGroupContainer(studyGroups) {
    var table = document.getElementById("groupsTable");
    var tbody = table.getElementsByTagName("tbody")[0]; // Create a tbody if not already present

    for (var i = 0; i < studyGroups.length; i++) {
        var studyGroup = studyGroups[i];

        var row = tbody.insertRow(-1);
        var courseNameCell = row.insertCell(0);
        var meetingDateCell = row.insertCell(1);
        var meetingTimeStartCell = row.insertCell(2);
        var capacityCell = row.insertCell(3);
        var locationCell = row.insertCell(4);
        var actionsCell = row.insertCell(5);

        courseNameCell.innerHTML = studyGroup.coursename;
        meetingDateCell.innerHTML = studyGroup.meetingDate;
        meetingTimeStartCell.innerHTML = studyGroup.meetingTimeStart;
        capacityCell.innerHTML = studyGroup.capacity;
        locationCell.innerHTML = studyGroup.location;

        actionsCell.innerHTML = "<button onclick='deleteGroup(\"" + studyGroup.coursename + "\")'>Delete</button>";
    }
}

// Delete account
function deleteAccount() {
    // Retrieve the email value using Thymeleaf expression
    var email = document.getElementById("emailValue").textContent;
    console.log("Enter here!");
    // Send a DELETE request to delete the user account with the retrieved email
    fetch('/deleteUser/' + email)
    .then(response => response.text())
    .then(result => {
        alert(result); // Display the result message
        location.reload(); // Refresh the page after deletion
        window.location.href = "http://localhost:8080";
    })
    .catch(error => {
        console.error('Error deleting account:', error);
    });
}


// Delete group
function deleteGroup(coursename) {
    console.log("enter here");
	var email = document.getElementById("emailValue").textContent;
    console.log(email);
    // Send a DELETE request to remove the user from the group with the provided group ID
    // hardcode here
    fetch('/deleteUserFromGroup/' + email + '/' + coursename)    
    .then(response => response.text())
    .then(result => {
        alert(result); // Display the result message
        location.reload(); // Refresh the page after removal from the group
    })
    .catch(error => {
        console.error('Error deleting user from group:', error);
    });
}
