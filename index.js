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
    searchBar.addEventListener("input", async () => {
        const songs = await fetchSongsData();
        const query = searchBar.value.toLowerCase();
        const filteredSongs = songs.filter(
          song =>
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query) ||
            song.lyrics.toLowerCase().includes(query) ||
            song.genre.toLowerCase().includes(query)
        );
        displaySongs(filteredSongs);
      });
      async function fetchSongsData() {
        try {
          const response = await fetch("http://localhost:3000/songs");
          if (!response.ok) throw new Error("Failed to fetch songs");
          return await response.json();
        } catch (error) {
          console.error("Error fetching songs:", error);
          songsContainer.innerHTML = "<p>Error loading songs.</p>";
          return [];
        }
      }
    
      function fetchSongs() {
        fetchSongsData().then(songs => displaySongs(songs));
      }
      function displaySongs(songs) {
        songsContainer.innerHTML = "";
        if (songs.length === 0) {
          songsContainer.innerHTML = "<p>No songs found.</p>";
          return;
        }
        songs.forEach(song => {
          const songDiv = document.createElement("div");
          songDiv.classList.add("song-card");
          
          let imageUrl;
          if (song.title === "No Pole") {
            imageUrl = "images/don toliver.jpeg";
          } else if (song.title === "Swim") {
            imageUrl = "images/chase .jpeg";
          } else if (song.title === "Never Lose Me") {
            imageUrl = "images/flo.jpeg";
          } else if (song.title === "She Will") {
            imageUrl = "images/lil.jpeg";
          } else if (song.title === "Reflections") {
            imageUrl = "images/reflections.jpeg";
          } else {
            imageUrl = "images/default.jpg"; 
          }
  
          songDiv.innerHTML = `
            <img src="${imageUrl}" alt="${song.title}">
            <h3>${song.title}</h3>
            <p><strong>Artist:</strong> ${song.artist}</p>
            <p><strong>Genre:</strong> ${song.genre}</p>
            <button onclick="playSong('${song.url}')">Play</button>
          `;
          songsContainer.appendChild(songDiv);
        });
      }
      async function fetchJamsData() {
        try {
          const response = await fetch("http://localhost:3000/jams");
          if (!response.ok) throw new Error("Failed to fetch jams");
          return await response.json();
        } catch (error) {
          console.error("Error fetching jams:", error);
          jamsContainer.innerHTML = "<p>Error loading jams.</p>";
          return [];
        }
      }
    
      function fetchJams() {
        fetchJamsData().then(jams => displayJams(jams));
      }
    
      function displayJams(jams) {
        jamsContainer.innerHTML = "";
        if (jams.length === 0) {
          jamsContainer.innerHTML = "<p>No jams found.</p>";
          return;
        }
        jams.forEach(jam => {
          const jamDiv = document.createElement("div");
          jamDiv.classList.add("jam-card");
          jamDiv.innerHTML = `
            <img src="${jam.imageUrl}" alt="${jam.name}">
            <h3>${jam.name}</h3>
            <p>Created by ${jam.creator}</p>
            <button class="join-btn" data-jam-id="${jam.id}">Join Jam</button>
          `;
          jamsContainer.appendChild(jamDiv);
        });
             
    