import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { database } from "./firebase.js";

// Reference to teams in Firebase Database
const teamsRef = ref(database, "teams");

// Populate Dropdown with Team Names
get(teamsRef).then((snapshot) => {
    const select = document.getElementById("teamName-robowar");
    select.innerHTML = '<option value="">Select Team</option>'; // Reset options

    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            let teamName = childSnapshot.key; // Get team name from database
            let option = document.createElement("option");
            option.value = teamName;
            option.textContent = teamName;
            select.appendChild(option);
        });
    } else {
        console.log("No teams found in the database.");
    }
}).catch((error) => {
    console.error("Error fetching teams:", error);
});

// Update Team Score in Firebase
document.getElementById("UpdateScore-robowar").addEventListener("click", function () {
    let selectedTeam = document.getElementById("teamName-robowar").value;
    let newScore = document.getElementById("teamScore").value.trim();
    let newTime = document.getElementById("teamTime").value.trim();
    const updateData = {}; // Create an empty object

    if (newScore !== "") {
        updateData.robowarScore = newScore;
    }
    
    if (newTime !== "") {
        updateData.robowarTime = newTime;
    }
    // Update Firebase Realtime Database
    const teamRef = ref(database, "teams/" + selectedTeam);

    update(teamRef, updateData)
        .then(() => {
            alert("✅ Score Updated Successfully!");
            console.log(`✅ Updated ${selectedTeam}`);
        })
        .catch((error) => {
            console.error("❌ Error updating score:", error);
            alert("Error updating score: " + error.message);
        });
});
