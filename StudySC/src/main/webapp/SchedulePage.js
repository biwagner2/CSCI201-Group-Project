document.addEventListener('DOMContentLoaded', function() {
    var joinButtons = document.querySelectorAll('.join-btn');
    joinButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        alert('Join button clicked for ' + this.previousElementSibling.previousElementSibling.textContent);
      });
    });
  });