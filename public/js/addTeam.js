import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { database } from "./firebase.js";

const addTeamBTN = document.getElementById("addTeam");
console.log("addTeam button:", addTeamBTN);

addTeamBTN.addEventListener("click", async () => {
    const teamNameValue = document.getElementById("teamName").value.trim();
    const teamIdValue = document.getElementById("teamId").value.trim();
    console.log("Team Name:", teamNameValue, "Team ID:", teamIdValue);

    if (!teamNameValue || !teamIdValue) {
        alert("Please enter both Team Name and Team ID.");
        return;
    }

    const dataPath = `teams/${teamIdValue}`;
    console.log("Checking path:", dataPath);

    const dataRef = ref(database, dataPath);

    // Check if the team ID already exists
    try {
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
            alert("❌ Team ID already exists. Please choose a different ID.");
            console.warn("Team ID already exists:", teamIdValue);
            return;
        }

        // If team ID doesn't exist, proceed to add it
        await set(dataRef, { teamName: teamNameValue });
        console.log("✅ Team added successfully!");
        alert("✅ Team added successfully!");
    } catch (error) {
        console.error("❌ Error checking team ID:", error);
        alert("Error checking team ID: " + error.message);
    }
});
