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

function deleteAccount() {
    // SEND QUERY TO SQL TO DELETE
}

function addCourse() {
    var table = document.getElementById("scheduleTable");
    var row = table.insertRow(-1); // Inserts a row at the end of the table
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = "New Course"; // Placeholder text for new course
    cell2.innerHTML = "<button onclick='editCourse(this)'>Edit</button> <button onclick='deleteCourse(this)'>Delete</button>";
    window.location.href = 'NewCourse.html';
}

function editCourse(btn) {
    var row = btn.parentNode.parentNode;
    var courseName = prompt("Edit the course name:", row.cells[0].innerHTML);
    if (courseName) {
        row.cells[0].innerHTML = courseName;
    }
}

function deleteCourse(btn) {
    if (confirm("Are you sure you want to delete this course?")) {
        var row = btn.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}

function addGroup() {
    var table = document.getElementById("groupsTable");
    var row = table.insertRow(-1); // Inserts a row at the end of the table
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = "New Study Group"; // Placeholder text for new group
    cell2.innerHTML = "<button onclick='editGroup(this)'>Edit</button> <button onclick='deleteGroup(this)'>Delete</button>";
    window.location.href = 'NewStudyGroup.html';
}

function chatGroup(btn) {
    var row = btn.parentNode.parentNode;
    var groupName = row.cells[0].innerHTML;
    alert("Chat functionality not implemented. Group: " + groupName);
    // Implement chat functionality or redirect to chat page
}

function editGroup(btn) {
    var row = btn.parentNode.parentNode;
    var groupName = prompt("Edit the goup name:", row.cells[0].innerHTML);
    if (groupName) {
        row.cells[0].innerHTML = groupName;
    }
}

function deleteGroup(btn) {
    if (confirm("Are you sure you want to delete this group?")) {
        var row = btn.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}

