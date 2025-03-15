import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { database } from "./firebase.js";

    // Handling "hid" expansion logic
    const btn = document.getElementById("something");
    const hid = document.getElementById("hide");

    if (btn && hid) {
        btn.addEventListener("mouseover", function () {
            hid.classList.add("active");
        });

        btn.addEventListener("mouseout", function () {
            hid.classList.remove("active");
        });
    } else {
        console.error("❌ Element with id 'something' or 'hide' not found!");
    }

    // Firebase Listener to fetch & update data in real-time
    const leaderboardContainer = document.querySelector(".leaderboard");


    function renderTeams(data) {
        console.log("✅ Rendering teams:", data);

        // Reset leaderboard container (keep header)
        leaderboardContainer.innerHTML = `
            <div class="leaderboard-header">
                <span class="rank-header">Rank</span>
                <span class="name-header">Team Name</span>
                <span class="points-header">Points</span>
            </div>
        `;

        // Convert object to array and sort by points (descending)
        const teamsArray = Object.entries(data).map(([id, value]) => ({
            id,
            name: value.teamName || "Unknown Team",
            roboraceScore: value.roboraceScore || 0,
            roboraceTime: value.roboraceTime || 0,
            robowarScore: value.robowarScore || "--",
            robowarTime: value.robowarTime || "--",
        })).sort((a, b) => b.points - a.points);
        console.log("🔢 Sorted teams array:", teamsArray);
        teamsArray.forEach((team, index) => {
            const entryDiv = document.createElement("div");
            entryDiv.classList.add("leaderboard-entry");

            entryDiv.innerHTML = `
                <div class="elements-inside">
                    <span class="rank">${index + 1}</span>
                    <span class="name">${team.name}</span>
                   <span class="points">
    ${ (parseInt(team.roboraceScore) || 0) + (parseInt(team.robowarScore) || 0) }
</span>

</div><div class="details nigga" id="hide">
            <div class="robo-race">
              <img src="resources/roborace.png" alt="Robo Race" class="race">
              <hr>
              <p>Best Time: <span class="race-time">${team.roboraceTime}</span></p>
              <p>Points: <span class="race-points">${team.roboraceScore}</span></p>
            </div>
            <div class="robo-war">
              <img src="resources/robowar.png" alt="robo war" class="war">
              <hr>
              <table class="robo-table">
                <tr>
                  <th>M.No</th>
                  <th>Best Time</th>
                    <th>Points</th>
                  </tr>
                  <tr>
                    <td class="match-number">1</td>
                    <td class="best-time">${team.robowarTime}</td>
                    <td class="war-points">${team.robowarScore}</td>
                  </tr>
                </table>
            </div>
          </div>  
          
            `;

            leaderboardContainer.appendChild(entryDiv);
        });
    }

    // Firebase Listener to fetch & update data in real-time
    const teamsRef = ref(database, "teams");

    onValue(teamsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            renderTeams(data);
            console.log("✅ Teams fetched from the database:", data);
        } else {
            console.warn("⚠️ No teams found in the database.");
        }
    });
