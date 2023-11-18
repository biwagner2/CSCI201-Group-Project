

// document.addEventListener('DOMContentLoaded', function() {
//     var joinButtons = document.querySelectorAll('.join-btn');
//     joinButtons.forEach(function(button) {
//       button.addEventListener('click', function() {
//         alert('Join button clicked for ' + this.previousElementSibling.previousElementSibling.textContent);
//       });
//     });
//   });


document.addEventListener('DOMContentLoaded', function () {
  // Add the initial courses when the page loads
  addRow();
  addRow();
  addRow();
});


  function addRow() {
    // Get the number of existing courses
    var courseCount = document.querySelectorAll(".courseContainer .course").length;

    // Create a course div
    var courseDiv = document.createElement("div");
    courseDiv.classList.add("course");

    // Create elements with specific classes and styles

    var courseTitleDiv = document.createElement("div");
    courseTitleDiv.classList.add("courseTitle");

    // Generate a random background color for the h2
    var randomOpacity = Math.random() * 0.3 + 0.2; // Opacity between 0.5 and 1
    var randomBgColor = 'rgba(' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) + ',' +
        randomOpacity + ')';

    // Create an h2 element with a random background color and append it to the courseTitle div
    var heading = document.createElement("h2");
    heading.textContent = "New Course " + (courseCount + 1);
    heading.style.backgroundColor = randomBgColor;
    courseTitleDiv.appendChild(heading);

    courseDiv.appendChild(courseTitleDiv);
    var labelDiv = document.createElement("div");
    labelDiv.classList.add("label");

    ["Status", "Location", "Time", "Size"].forEach(function (labelText) {
        var label = document.createElement("a");
        label.textContent = labelText;
        labelDiv.appendChild(label);
    });

    courseDiv.appendChild(labelDiv);

    var detailsDiv = document.createElement("div");
    detailsDiv.classList.add("details");
    
    courseDiv.appendChild(detailsDiv);

    

    // Get the existing courses container
    var courseContainer = document.querySelector(".courseContainer");

    // Append the course div to the existing courses container

    

    courseContainer.appendChild(courseDiv);
    addDetailsRows(detailsDiv); 
    addDetailsRows(detailsDiv);

}


function addDetailsRows(courseDiv) {
  // Create a details div under the course
  var detailsDiv = document.createElement("div");
  detailsDiv.classList.add("details");

  // Customize the details content based on your requirements
  detailsDiv.innerHTML = `
      <p>DMC 101 | 1:00 PM - 2:00 PM | Size: 6/8</p>
  `;

  var joinBtn = document.createElement("div");
    joinBtn.classList.add("join-btn");
    joinBtn.textContent = "Join";
    
    detailsDiv.appendChild(joinBtn);

  // Append the details div to the course div
  courseDiv.appendChild(detailsDiv);
}

