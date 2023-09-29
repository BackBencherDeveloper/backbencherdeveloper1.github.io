function updateCategoryBackground() {
    const taskItems = document.querySelectorAll('#task-container ul li');

    taskItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        const categoryElement = item.querySelector('#category');

        // Define a mapping of category IDs to background colors
        const categoryColors = {
            personal: 'teal',
            work: 'darkmagenta',
            school: 'lightcoral',
            cleaning: 'cornflowerblue',
            others: 'coral',
        };

        // Set the background color based on the category ID
        if (categoryColors.hasOwnProperty(category)) {
            categoryElement.style.backgroundColor = categoryColors[category];
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    updateCategoryBackground();
    updateTaskCounts();
});

// Call this function after adding a new task
updateCategoryBackground();
// Call this function after adding a new task
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const taskName = this.value;
        fetch(`/edit-task/?taskName=${encodeURIComponent(taskName)}`, {
          method: "GET",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.text();
          })
          .then((data) => {
            console.log(data);
            updateTaskCounts();
          })
          .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
          });
      });
    });
  });
function updateTaskCounts() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const pendingCount = checkboxes.length - Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
  const completedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
  document.getElementById("pending-count").textContent = pendingCount;
  document.getElementById("completed-count").textContent = completedCount;
}
  

function deleteTasks() {
  fetch('/delete-tasks', {
      method: 'POST',
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      // Reload the page after deleting tasks
      location.reload();
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}