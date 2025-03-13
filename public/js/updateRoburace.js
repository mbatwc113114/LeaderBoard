import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { database } from "./firebase.js";

// Reference to teams in Firebase Database
const teamsRef = ref(database, "teams");

// Populate Dropdown with Team Names
get(teamsRef).then((snapshot) => {
    const select = document.getElementById("teamName-roborace");
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
document.getElementById("UpdateScore-roborace").addEventListener("click", function () {
    let selectedTeam = document.getElementById("teamName-roborace").value;
    let newScore = document.getElementById("teamScore").value.trim();

    if (selectedTeam === "" || newScore === "") {
        alert("Please select a team and enter a score!");
        return;
    }

    // Update Firebase Realtime Database
    const teamRef = ref(database, "teams/" + selectedTeam);

    update(teamRef, { roboraceScore: newScore })
        .then(() => {
            alert("✅ Score Updated Successfully!");
            console.log(`✅ Updated ${selectedTeam}'s score to ${newScore}`);
        })
        .catch((error) => {
            console.error("❌ Error updating score:", error);
            alert("Error updating score: " + error.message);
        });
});
