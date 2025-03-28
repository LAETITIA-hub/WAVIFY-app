// document.addEventListener("DOMContentLoaded", () => {
//     const songsContainer = document.getElementById("songsContainer");
//     const searchBar = document.getElementById("searchBar");
//     const toggleSwitch = document.getElementById("theme-toggle"); 
//     const themeToggle = document.getElementById("themeToggle"); 
//     const jamsContainer = document.getElementById("jamsContainer");
//     const body = document.body;
//     const currentUser = "CurrentUser"; 
  
//     if (localStorage.getItem("theme") === "dark") {
//       body.classList.add("dark-mode");
//       toggleSwitch.checked = true;
//       themeToggle.checked = true;
//     }
  
//     [toggleSwitch, themeToggle].forEach(toggle => {
//       toggle.addEventListener("change", () => {
//         body.classList.toggle("dark-mode");
//         localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
//         toggleSwitch.checked = body.classList.contains("dark-mode");
//         themeToggle.checked = body.classList.contains("dark-mode");
//       });
//     });
  
//     fetchSongs();
//     fetchJams();
//     searchBar.addEventListener("input", async () => {
//         const songs = await fetchSongsData();
//         const query = searchBar.value.toLowerCase();
//         const filteredSongs = songs.filter(
//           song =>
//             song.title.toLowerCase().includes(query) ||
//             song.artist.toLowerCase().includes(query) ||
//             song.lyrics.toLowerCase().includes(query) ||
//             song.genre.toLowerCase().includes(query)
//         );
//         displaySongs(filteredSongs);
//       });
//       async function fetchSongsData() {
//         try {
//           const response = await fetch("https://wavify-app.onrender.com/db.json");
//           if (!response.ok) throw new Error("Failed to fetch songs");
//           return await response.json();
//         } catch (error) {
//           console.error("Error fetching songs:", error);
//           songsContainer.innerHTML = "<p>Error loading songs.</p>";
//           return [];
//         }
//       }
    
//       function fetchSongs() {
//         fetchSongsData().then(songs => displaySongs(songs));
//       }
//       function displaySongs(songs) {
//         songsContainer.innerHTML = "";
//         if (songs.length === 0) {
//           songsContainer.innerHTML = "<p>No songs found.</p>";
//           return;
//         }
//         songs.forEach(song => {
//           const songDiv = document.createElement("div");
//           songDiv.classList.add("song-card");
          
//           let imageUrl;
//           if (song.title === "No Pole") {
//             imageUrl = "images/don toliver.jpeg";
//           } else if (song.title === "Swim") {
//             imageUrl = "images/chase .jpeg";
//           } else if (song.title === "Never Lose Me") {
//             imageUrl = "images/flo.jpeg";
//           } else if (song.title === "She Will") {
//             imageUrl = "images/lil.jpeg";
//           } else if (song.title === "Reflections") {
//             imageUrl = "images/reflections.jpeg";
//           } else {
//             imageUrl = "images/default.jpg"; 
//           }
  
//           songDiv.innerHTML = `
//             <img src="${imageUrl}" alt="${song.title}">
//             <h3>${song.title}</h3>
//             <p><strong>Artist:</strong> ${song.artist}</p>
//             <p><strong>Genre:</strong> ${song.genre}</p>
//             <button onclick="playSong('${song.url}')">Play</button>
//           `;
//           songsContainer.appendChild(songDiv);
//         });
//       }
//       async function fetchJamsData() {
//         try {
//           const response = await fetch("");
//           if (!response.ok) throw new Error("Failed to fetch jams");
//           return await response.json();
//         } catch (error) {
//           console.error("Error fetching jams:", error);
//           jamsContainer.innerHTML = "<p>Error loading jams.</p>";
//           return [];
//         }
//       }
    
//       function fetchJams() {
//         fetchJamsData().then(jams => displayJams(jams));
//       }
    
//       function displayJams(jams) {
//         jamsContainer.innerHTML = "";
//         if (jams.length === 0) {
//           jamsContainer.innerHTML = "<p>No jams found.</p>";
//           return;
//         }
//         jams.forEach(jam => {
//           const jamDiv = document.createElement("div");
//           jamDiv.classList.add("jam-card");
//           jamDiv.innerHTML = `
//             <img src="${jam.imageUrl}" alt="${jam.name}">
//             <h3>${jam.name}</h3>
//             <p>Created by ${jam.creator}</p>
//             <button class="join-btn" data-jam-id="${jam.id}">Join Jam</button>
//           `;
//           jamsContainer.appendChild(jamDiv);
//         });
//         document.querySelectorAll(".join-btn").forEach(button => {
//             button.addEventListener("click", handleJoinJam);
//           });
//         }
      
//         async function handleJoinJam(event) {
//           const jamId = event.target.getAttribute("data-jam-id");
//           try {
//             const response = await fetch(`http://localhost:3000/jams/${jamId}`);
//             const jam = await response.json();
      
//             if (!jam.participants.includes(currentUser)) {
//               jam.participants.push(currentUser);
//               await fetch(`http://localhost:3000/jams/${jamId}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(jam)
//               });
//               alert(`Joined ${jam.name}!`);
//               fetchJams(); 
//               displayJamDetails(jam); 
//             } else {
//               alert("You're already in this jam!");
//             }
//           } catch (error) {
//             console.error("Error joining jam:", error);
//           }
//         }
//      async function displayJamDetails(jam) {
//       const songs = await fetchSongsData();
//       const jamSongs = songs.filter(song => jam.songIds.includes(song.id));
//       jamsContainer.innerHTML = `
//         <h2>${jam.name}</h2>
//         <p>Created by: ${jam.creator}</p>
//         <p>Participants: ${jam.participants.join(", ")}</p>
//         <h3>Songs:</h3>
//         <ul>
//           ${jamSongs.map(song => `<li>${song.title} by ${song.artist} <button class="join-btn" onclick="playSong('${song.url}')">Play</button></li>`).join("")}
//         </ul>
//       `;
//     }
  
//     window.playSong = function (url) {
//       const audio = new Audio(url);
//       audio.play();
//     };
// });                 
document.addEventListener("DOMContentLoaded", () => {
    const songsContainer = document.getElementById("songsContainer");
    const searchBar = document.getElementById("searchBar");
    const toggleSwitch = document.getElementById("theme-toggle");
    const themeToggle = document.getElementById("themeToggle");
    const jamsContainer = document.getElementById("jamsContainer");
    const body = document.body;
    const currentUser = "CurrentUser";
    const renderUrl = "https://wavify-app.onrender.com"; // Your Render URL
  
    // Theme setup
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
  
    // Fetch and display songs and jams
    fetchSongs();
    fetchJams();
  
    // Search functionality
    searchBar.addEventListener("input", async () => {
      const data = await fetchData();
      const query = searchBar.value.toLowerCase();
      const filteredSongs = data.songs.filter(
        song =>
          song.title.toLowerCase().includes(query) ||
          song.artist.toLowerCase().includes(query) ||
          song.lyrics.toLowerCase().includes(query) ||
          song.genre.toLowerCase().includes(query)
      );
      displaySongs(filteredSongs);
    });
  
    // Fetch data from db.json
    async function fetchData() {
      try {
        const response = await fetch(`${renderUrl}/db.json`);
        if (!response.ok) throw new Error("Failed to fetch data");
        return await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
        songsContainer.innerHTML = "<p>Error loading songs.</p>";
        jamsContainer.innerHTML = "<p>Error loading jams.</p>";
        return { songs: [], jams: [] };
      }
    }
  
    // Fetch and display songs
    async function fetchSongs() {
      const data = await fetchData();
      displaySongs(data.songs);
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
        songDiv.innerHTML = `
          <img src="${renderUrl}/${song.imageUrl}" alt="${song.title}">
          <h3>${song.title}</h3>
          <p><strong>Artist:</strong> ${song.artist}</p>
          <p><strong>Genre:</strong> ${song.genre}</p>
          <button onclick="playSong('${renderUrl}/${song.url}')">Play</button>
        `;
        songsContainer.appendChild(songDiv);
      });
    }
  
    // Fetch and display jams
    async function fetchJams() {
      const data = await fetchData();
      displayJams(data.jams);
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
          <img src="${renderUrl}/${jam.imageUrl}" alt="${jam.name}">
          <h3>${jam.name}</h3>
          <p>Created by ${jam.creator}</p>
          <button class="join-btn" data-jam-id="${jam.id}">Join Jam</button>
        `;
        jamsContainer.appendChild(jamDiv);
      });
      document.querySelectorAll(".join-btn").forEach(button => {
        button.addEventListener("click", (event) => handleJoinJam(event, jams));
      });
    }
  
    // Handle joining a jam (static simulation since Render is static)
    function handleJoinJam(event, jams) {
      const jamId = event.target.getAttribute("data-jam-id");
      const jam = jams.find(j => j.id === jamId);
      if (!jam) {
        alert("Jam not found!");
        return;
      }
      if (!jam.participants.includes(currentUser)) {
        jam.participants.push(currentUser);
        alert(`Joined ${jam.name}!`);
        displayJamDetails(jam);
        fetchJams(); // Refresh jams display
      } else {
        alert("You're already in this jam!");
      }
    }
  
    // Display jam details
    async function displayJamDetails(jam) {
      const data = await fetchData();
      const jamSongs = data.songs.filter(song => jam.songIds.map(Number).includes(Number(song.id)));
      jamsContainer.innerHTML = `
        <h2>${jam.name}</h2>
        <p>Created by: ${jam.creator}</p>
        <p>Participants: ${jam.participants.join(", ")}</p>
        <h3>Songs:</h3>
        <ul>
          ${jamSongs.map(song => `
            <li>
              ${song.title} by ${song.artist}
              <button onclick="playSong('${renderUrl}/${song.url}')">Play</button>
            </li>
          `).join("")}
        </ul>
      `;
    }
  
    // Play song function
    window.playSong = function(url) {
      const audio = new Audio(url);
      audio.play();
    };
  });