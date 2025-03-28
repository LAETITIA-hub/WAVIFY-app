document.addEventListener("DOMContentLoaded", () => {
    const songsContainer = document.getElementById("songsContainer");
    const searchBar = document.getElementById("searchBar");
    const toggleSwitch = document.getElementById("theme-toggle"); 
    const themeToggle = document.getElementById("themeToggle"); 
    const jamsContainer = document.getElementById("jamsContainer");
    const body = document.body;
    const currentUser = "CurrentUser"; 
  
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode");
      toggleSwitch.checked = true;
      themeToggle.checked = true;
    }
  
    [toggleSwitch, themeToggle].forEach(toggle => {
      toggle.addEventListener("change", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
        toggleSwitch.checked = body.classList.contains("dark-mode");
        themeToggle.checked = body.classList.contains("dark-mode");
      });
    });
  
    fetchSongs();
    fetchJams();
  