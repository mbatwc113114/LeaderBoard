function renderTeams(data) {
    console.log("✅ Rendering teams:", data);

    // Clear and reset leaderboard before adding new data
    leaderboardContainer.innerHTML = `
        <div class="leaderboard-header">
            <span class="rank-header">Rank</span>
            <span class="name-header">Team Name</span>
            <span class="points-header">Points</span>
        </div>
    `;

    // Convert object to array and compute total points
    const teamsArray = Object.entries(data).map(([id, value]) => {
        const roboraceScore = Number(value.roboraceScore) || 0;
        const robowarScore = Number(value.robowarScore) || 0;
        const totalPoints = roboraceScore + robowarScore;

        return {
            id,
            name: value.teamName || "Unknown Team",
            roboraceScore,
            roboraceTime: value.roboraceTime || "--",
            robowarScore,
            robowarTime: value.robowarTime || "--",
            totalPoints,
        };
    });

    // Sort teams in descending order based on total points
    teamsArray.sort((a, b) => b.totalPoints - a.totalPoints);

    console.log("🔢 Sorted teams array:", teamsArray);

    let currentRank = 1; 
    let previousPoints = null;

    // Append sorted teams to leaderboard
    teamsArray.forEach((team, index) => {
        if (team.totalPoints !== previousPoints) {
            currentRank = index + 1; // Assign new rank when points change
        }
        previousPoints = team.totalPoints;

        const entryDiv = document.createElement("div");
        entryDiv.classList.add("leaderboard-entry");

        entryDiv.innerHTML = `
            <div class="elements-inside">
                <span class="rank">${currentRank}</span>
                <span class="name">${team.name}</span>
                <span class="points">${team.totalPoints}</span>
            </div>
            <div class="details" id="hide">
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
        console.log("✅ Teams fetched & updated from the database:", data);
    } else {
        console.warn("⚠️ No teams found in the database.");
    }
});
